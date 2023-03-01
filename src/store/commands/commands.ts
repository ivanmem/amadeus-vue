import { defineStore } from "pinia";
import { Command } from "./types";
import orderBy from "lodash/orderBy";
import CommandsService from "../../services/CommandsService";

interface CommandAllVariantsNames {
  id: number;
  names: string[];
}

interface CommandsState {
  commands: Record<string, Command>;
}

export const useCommands = defineStore("commands", {
  state: (): CommandsState => {
    return {
      commands: {},
    };
  },
  actions: {
    async load() {
      if (Object.keys(this.commands).length) {
        return;
      }

      try {
        this.commands = (await (
          await fetch("https://amadeus.ddns.net/api/Commands")
        ).json()) as Record<string, Command>;
      } catch {
        this.commands = (await (
          await fetch("/commands.json")
        ).json()) as Record<string, Command>;
      }
    },
    getCommandById(id: string | number): Command {
      return this.commands[id];
    },
    getCommandFullName(id: number | string): string {
      const command = this.getCommandById(id);
      if (!command) {
        return `Неизвестная команда ${id}`;
      }

      if (!command.idOriginal) {
        return command.alias[0];
      }

      const commandOriginal = this.getCommandById(command.idOriginal);

      return `${commandOriginal.alias[0]} ${command.alias[0]}`;
    },

    searchCommand(_search: string): Command[] {
      const search = _search.trim().toLowerCase();
      if (search.length === 0) {
        return [];
      }

      return (
        this.commandsAllVariantsNames.filter((x) =>
          x.names.find((name) => name.includes(search))
        ) || []
      ).map((x) => this.getCommandById(x.id));
    },
    searchDescription(_search: string): Command[] {
      const search = _search.trim().toLowerCase();
      if (search.length === 0) {
        return [];
      }

      return this.commandsOrder.filter((x) =>
        x.helpExtended.toLowerCase().includes(search)
      );
    },
  },
  getters: {
    // возвращает все команды и их модификаторы
    commandsOrder(): Command[] {
      const store = useCommands();
      const commands = Object.keys(store.commands).map(
        (key) => store.commands[key]
      );
      return CommandsService.orderBy(commands);
    },
    // сортировка команд по полному названию
    orderBy(): Command[] {
      const store = useCommands();
      return orderBy(
        store.commands,
        [(x) => useCommands().getCommandFullName(x.id)],
        "asc"
      );
    },
    // возвращает только основные команды (без их модификаторов)
    commandsOriginal(): Command[] {
      const store = useCommands();
      const commands = Object.keys(store.commands)
        .filter((key) => Number(key) > 0)
        .map((key) => store.commands[key]);
      return CommandsService.orderBy(commands);
    },
    // возвращает только модификаторы команд
    commandsModifiers(): Command[] {
      const store = useCommands();
      const commands = Object.keys(store.commands!)
        .filter((key) => Number(key) < 0)
        .map((key) => store.commands![key]);
      return CommandsService.orderBy(commands);
    },
    commandsAllVariantsNames(): CommandAllVariantsNames[] {
      const store = useCommands();
      const commandsOriginal: CommandAllVariantsNames[] =
        store.commandsOriginal.map((command) => ({
          id: command.id,
          names: command.alias,
        }));

      const commandsModifiers: CommandAllVariantsNames[] =
        store.commandsModifiers.map((command) => {
          const commandOriginal = store.getCommandById(command.idOriginal!);
          return {
            id: command.id,
            names: commandOriginal.alias
              .map((aliasOriginal) => [
                ...command.alias.map((alias) => `${aliasOriginal} ${alias}`),
              ])
              .flat(),
          };
        });

      return [...commandsOriginal, ...commandsModifiers];
    },
  },
});
