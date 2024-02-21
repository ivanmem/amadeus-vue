export interface Docs {
  commands: Record<string | number, Command>;
  events: EventsDoc;
  commandsSchema: CommandsSchema;
}

export interface Command {
  id: number;
  idOriginal?: number;
  alias: string[];
  accessLevel?: number; // если не указано, то 0
  argumentsListString: string;
  helpExtended: string;
  commandImplicit?: CommandImplicit[];
  gameMode?: boolean;
  ignoreFilter?: boolean;
  disabled?: boolean;
  privateMessages?: PermissionPrivateMessagesTypeEnum;
  onlyPrivateMessages?: boolean;
  notPrivateMessages?: boolean;
  hide?: boolean;
  isOnlyBotCreator?: boolean;
  privateMessagesNotPeerId?: boolean;
  strictAliasMode?: boolean;
  donLevelRequired?: number;
  repeat?: RepeatCommandConversationEnum;
  timeLimit?: string;
  timeLimitConversation?: string;
  type?: TypeCommandEnum;
  arguments?: Argument[];
  modifiers?: number[];
  relatedCommands?: number[];
  keys?: CommandKey[];
  templateString: string;
  minTemplateString: string;
}

export interface CommandImplicit {
  alias: string[];
  help: string;
  helpExtended: string;
  arguments: Argument[];
}

export interface Argument {
  type?: ArgumentType;
  description: null | string;
  help: string;
  indexNotImportant: boolean;
  required: boolean;
  isHideType: boolean;
  isCheckRequired: boolean;
  newLine: boolean;
  accessValues?: string[];
}

export interface ArgumentKeyParam {
  description: string;
  templateString: string;
}

export interface CommandKey {
  alias: string[];
  description: string;
  header: string;
  systemKey?: boolean;
  isDon?: boolean;
  key: number;
  accessLevel?: number;
  params?: ArgumentKeyParam[];
}

export enum RepeatCommandConversationEnum {
  None = "None",
  Yes = "Yes",
  No = "No",
}

export enum TypeCommandEnum {
  Unselected = "",
  ActionsUsers = "ДействиеСПользователями",
  Settings = "Настройка",
  Gaming = "Игровая",
  Information = "Информация",
  Service = "Сервисная",
}

export enum PermissionPrivateMessagesTypeEnum {
  None = "None",
  No = "No",
  Yes = "Yes",
  YesImportant = "YesImportant",
}

export interface EventsDoc {
  templateArguments: Record<string, string>;
  templateArgumentsDescription: Record<string, string>;
  options: Record<string, EventOption>;
}

export interface EventOption {
  type: number;
  alias: string[];
  requiredValue: boolean;
  description: string;
  example?: string;
  max?: number;
}

export interface CommandsSchema {
  penalityValues: Record<PenalityValues, string[]>;
  typeStringDictionary: Record<ArgumentType, string>;
  typeDescriptionDictionary: Record<ArgumentType, string>;
}

export type PenalityValues =
  | "Disabled"
  | "None"
  | "Warned"
  | "Kicked"
  | "Banned"
  | "Delete";

export type ArgumentType =
  | "String"
  | "StringArray"
  | "Number"
  | "NumberRange"
  | "NumberOrRange"
  | "ForwardMessage"
  | "User"
  | "Date"
  | "Period"
  | "Penality"
  | "Attachment";
