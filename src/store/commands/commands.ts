import { defineStore } from "pinia";
import { Command, Docs, TypeCommandEnum } from "./types";
import CommandsService from "../../services/CommandsService";
import CommandHelper from "../../helpers/CommandHelper";
import { from, IEnumerable } from "linq-to-typescript";
import { ILang } from "../../types/ILang";
import { useVk } from "../vk/vk";
import { keys } from "../../helpers/keys";

export interface FiltersType {
  type: TypeCommandEnum;
  /** @description '' - не фильтровать, hide - показывать только false, only - показывать только true */
  isOnlyBotCreator: "" | "hide" | "only";
  favorite?: boolean;
  disabled?: boolean;
  levels?: string;
}

interface CommandAllVariantsNames {
  id: number;
  names: string[];
}

interface CommandsState {
  docs?: Docs;
  filters: FiltersType;
  favorite: Set<number>;
}

const initFilters = {
  type: TypeCommandEnum.Unselected,
  isOnlyBotCreator: "hide",
  disabled: false,
} satisfies FiltersType;

export const useCommands = defineStore("commands", {
  state: (): CommandsState => {
    return {
      docs: undefined,
      filters: structuredClone(initFilters),
      favorite: new Set(),
    };
  },
  actions: {
    async load() {
      if (Object.keys(this.commands).length) {
        return;
      }

      try {
        this.docs = (await (
          await fetch("https://xeleos.ddns.net/api/commands/doc", {
            signal: AbortSignal.timeout(5000),
          })
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
    saveCurrentFilters() {
      return useVk().setVkStorageDict({
        filters: this.filters,
      });
    },
    saveCurrentFavorite() {
      return useVk().setVkStorageDict({
        favorite: this.favorite,
      });
    },
    async updateFilters(filters?: FiltersType) {
      try {
        filters ??= await useVk().getVkStorageObject<FiltersType>("filters");
        if (filters && typeof filters === "object") {
          for (const key of keys(initFilters)) {
            if (filters[key] === undefined) {
              continue;
            }

            // задаём значения по умолчанию для тех свойств, которые не заполнены значением
            filters[key] = initFilters[key] as never;
          }

          this.filters = filters;
        }
      } catch (ex) {
        console.error(ex);
      }
    },
    async updateFavorite(favorite?: number[]) {
      try {
        favorite ??= await useVk().getVkStorageObject<number[]>("favorite");
        if (favorite && Array.isArray(favorite)) {
          this.favorite = new Set(favorite);
        }
      } catch (ex) {
        console.error(ex);
      }
    },
    resetFilters() {
      this.filters = structuredClone(initFilters);
    },
    setFilterLevels(value: [number, number]) {
      this.filters.levels = value.join(" ");
    },
    getFiltersLevels(value: string): [number, number] {
      return value.split(" ").map(Number) as never;
    },
  },
  getters: {
    filterLevels(): [number, number] {
      return useCommands().getFiltersLevels(this.filters.levels ?? "0 11");
    },
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
