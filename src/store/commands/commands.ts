import { defineStore } from "pinia";
import { Command, Docs, TypeCommandEnum } from "./types";
import CommandsService from "../../services/CommandsService";
import CommandHelper from "../../helpers/CommandHelper";
import { from, IEnumerable } from "linq-to-typescript";
import { ILang } from "../../types/ILang";

export interface FiltersType {
  type: TypeCommandEnum;
  /** @description '' - не фильтровать, hide - показывать только false, only - показывать только true */
  isOnlyBotCreator: "" | "hide" | "only";
}

interface CommandAllVariantsNames {
  id: number;
  names: string[];
}

interface CommandsState {
  docs?: Docs;
  filters: FiltersType;
}

export const useCommands = defineStore("commands", {
  state: (): CommandsState => {
    return {
      docs: undefined,
      filters: { type: TypeCommandEnum.Unselected, isOnlyBotCreator: "hide" },
    };
  },
  actions: {
    async load() {
      if (Object.keys(this.commands).length) {
        return;
      }

      try {
        this.docs = (await (
          await fetch("https://xeleos.ddns.net/api/commands/doc")
        ).json()) as Docs;
      } catch {
        this.docs = (await (await fetch("/doc.json")).json()) as Docs;
      }
    },
    getCommandById(id: string | number): Command {
      return this.commands[id];
    },
    getCommandFullName(id: number | string, lang: ILang = "ru"): string {
      const command = this.getCommandById(id);
      if (!command) {
        if (!this.commandsLoaded) {
          return "";
        }

        return `Неизвестная команда ${id}`;
      }

      if (!command.idOriginal) {
        return CommandHelper.getAliasByLang(command.alias, lang);
      }

      const commandOriginal = this.getCommandById(command.idOriginal);
      return `${CommandHelper.getAliasByLang(
        commandOriginal.alias,
        lang,
      )} ${CommandHelper.getAliasByLang(command.alias, lang)}`;
    },
    searchCommand(_search: string, filters?: FiltersType): Command[] {
      const search = _search.trim().toLowerCase();
      if (search.length === 0) {
        return [];
      }

      const whereName = (name: string) => name.includes(search);
      const searchCommands = from(this.commandsAllVariantsNames)
        .where((x: CommandAllVariantsNames) => {
          return Boolean(x.names.find((name) => whereName(name)));
        })
        .selectMany((x) => x.names.map((name) => ({ id: x.id, name })))
        .where((x) => whereName(x.name))
        .orderBy(
          (x) => x,
          (a, b) => {
            if (a.name.indexOf(search) > b.name.indexOf(search)) {
              return 1;
            } else if (a.name.indexOf(search) < b.name.indexOf(search)) {
              return -1;
            } else {
              if (a.name.length > b.name.length) return 1;
              else return -1;
            }
          },
        )
        .distinct((x, y) => x.id === y.id)
        .select((x) => this.getCommandById(x.id));
      return CommandHelper.getFiltered(searchCommands, filters).toArray();
    },
    searchDescription(_search: string, filters?: FiltersType): Command[] {
      const search = _search.trim().toLowerCase();
      if (search.length === 0) {
        return [];
      }

      const searchCommands = from(this.commandsOrder).where((x) =>
        x.helpExtended.toLowerCase().includes(search),
      );
      return CommandHelper.getFiltered(searchCommands, filters).toArray();
    },
  },
  getters: {
    commands(): Record<string | number, Command> {
      return this.docs?.commands ?? {};
    },
    commandsLoaded(): boolean {
      return Object.keys(this.commands).length > 0;
    },
    // возвращает все команды и их модификаторы
    commandsOrder(): Command[] {
      const store = useCommands();
      const commands = from(Object.keys(store.commands)).select(
        (key) => store.commands[key],
      );
      return CommandsService.orderBy(commands).toArray();
    },
    // сортировка команд по полному названию
    orderBy(): Command[] {
      const store = useCommands();
      return from(Object.values(store.commands))
        .orderBy((x) => useCommands().getCommandFullName(x.id))
        .toArray();
    },
    // возвращает только основные команды (без их модификаторов)
    commandsOriginal(): Command[] {
      const store = useCommands();
      const commands = from(Object.keys(store.commands))
        .where((key) => Number(key) > 0)
        .select((key) => store.commands[key]);
      return CommandsService.orderBy(commands).toArray();
    },
    // возвращает только модификаторы команд
    commandsModifiers(): Command[] {
      const store = useCommands();
      const commands = from(Object.keys(store.commands))
        .where((key) => Number(key) < 0)
        .select((key) => store.commands![key]);
      return CommandsService.orderBy(commands).toArray();
    },
    commandsAllVariantsNames(): CommandAllVariantsNames[] {
      const store = useCommands();
      const commandsOriginal: IEnumerable<CommandAllVariantsNames> = from(
        store.commandsOriginal,
      ).select((command) => ({
        id: command.id,
        names: command.alias,
      }));

      const commandsModifiers: IEnumerable<CommandAllVariantsNames> = from(
        store.commandsModifiers,
      ).select((command) => {
        const commandOriginal = store.getCommandById(command.idOriginal!);
        const names = from(commandOriginal.alias)
          .select((aliasOriginal) =>
            command.alias.map((alias) => `${aliasOriginal} ${alias}`),
          )
          .selectMany((x) => x)
          .toArray();
        return {
          id: command.id,
          names,
        };
      });

      return commandsOriginal.concatenate(commandsModifiers).toArray();
    },
  },
});
