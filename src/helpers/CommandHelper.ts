import {
  ArgumentType,
  Command,
  PermissionPrivateMessagesTypeEnum,
  TypeCommandEnum,
} from "../store/commands/types";
import { FiltersType, useCommands } from "../store/commands/commands";
import { ASelectOption } from "../components/ASelect/types";
import { IEnumerable } from "linq-to-typescript";
import { ILang } from "../types/ILang";

export const TYPES_COMMAND = {
  [TypeCommandEnum.Unselected]: "-- Не выбрано --",
  [TypeCommandEnum.Service]: "Сервисные",
  [TypeCommandEnum.Settings]: "Конфигурационные",
  [TypeCommandEnum.Information]: "Информационные",
  [TypeCommandEnum.Gaming]: "Игровые",
  [TypeCommandEnum.ActionsUsers]: "Манипулирующие пользователями",
};

export const TYPES_COMMAND_OPTIONS: ASelectOption[] = Object.keys(
  TYPES_COMMAND,
).map((x) => ({
  value: x,
  label: TYPES_COMMAND[x as keyof typeof TYPES_COMMAND],
}));
export const CREATOR_COMMANDS_OPTIONS: ASelectOption[] = [
  {
    value: "" satisfies FiltersType["isOnlyBotCreator"],
    label: "-- Не Выбрано --",
  },
  { value: "hide" satisfies FiltersType["isOnlyBotCreator"], label: "Нет" },
  {
    value: "only" satisfies FiltersType["isOnlyBotCreator"],
    label: "Да",
  },
];

class CommandHelper {
  static getFiltered(commands: IEnumerable<Command>, filters?: FiltersType) {
    if (!filters) {
      return commands;
    }

    const commandsStore = useCommands();
    return commands.where((command) => {
      if (command.disabled) {
        return false;
      }

      if (
        filters.favorite === true &&
        !commandsStore.favorite.has(command.id)
      ) {
        return false;
      }

      if (filters.isOnlyBotCreator === "hide" && command.isOnlyBotCreator) {
        return false;
      }

      if (filters.isOnlyBotCreator === "only" && !command.isOnlyBotCreator) {
        return false;
      }

      if (
        filters.type != TypeCommandEnum.Unselected &&
        command.type != filters.type
      ) {
        return false;
      }

      return true;
    });
  }

  static getSmileNumber(number: number): string {
    return number?.toString() || "";
  }

  static getLevelText(accessLevel = 0): string {
    return `${this.getNameLevel(accessLevel)} (${this.getSmileNumber(
      accessLevel,
    )} лвл)`;
  }

  static getNameLevel(accessLevel: number): string {
    switch (accessLevel) {
      case 11:
        return "Создатель";
      case 10:
        return "Помощник создателя";
      case 9:
        return "Старший администратор";
      case 8:
        return "Администратор";
      case 7:
        return "Помощник администратора";
      case 6:
        return "Старший модератор";
      case 5:
        return "Модератор";
      case 4:
        return "Помощник модератора";
      case 3:
        return "Старший участник";
      case 2:
        return "Участник";
      case 1:
        return "Младший участник";
      case 0:
        return "Прохожий";
      default:
        return "Бесправный";
    }
  }

  static getType(type = TypeCommandEnum.Unselected): string {
    return TYPES_COMMAND[type];
  }

  static getArgumentType(type: ArgumentType | undefined): string {
    if (!type) {
      return "";
    }

    return useCommands().docs?.commandsSchema.typeStringDictionary[type] ?? "";
  }

  static getArgumentTypeDescription(type: ArgumentType): string {
    return (
      useCommands().docs?.commandsSchema.typeDescriptionDictionary[type] ?? ""
    );
  }

  static getAliasByLang(aliases: string[], lang: ILang) {
    if (lang == "ru") {
      return aliases[0];
    }

    return aliases[aliases.length - 1];
  }

  // Разрешена ли команда в личных сообщениях
  static isAccessLs(
    privateMessages: PermissionPrivateMessagesTypeEnum = PermissionPrivateMessagesTypeEnum.No,
  ): boolean {
    return (
      privateMessages !== PermissionPrivateMessagesTypeEnum.No &&
      privateMessages !== PermissionPrivateMessagesTypeEnum.None
    );
  }
}

export default CommandHelper;
