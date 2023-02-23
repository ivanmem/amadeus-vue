export interface Command {
  id: number;
  idOriginal?: number;
  alias: string[];
  accessLevel: number;
  argumentsListString: string;
  helpExtended: string;
  commandImplicit?: CommandImplicit[];
  gameMode?: boolean;
  ignoreFilter?: boolean;
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
  type: number;
  description: null | string;
  help: string;
  indexNotImportant: boolean;
  required: boolean;
  isHideType: boolean;
  isCheckRequired: boolean;
  newLine: boolean;
  typeString: TypeString;
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

export enum TypeString {
  Date = "date",
  Message = "message",
  Number = "number",
  Penality = "penality",
  Period = "period",
  PurpleNumber = "number[]",
  String = "string",
  TypeStringNumber = "number[-]",
  TypeStringString = "string*",
  User = "user",
}

export enum RepeatCommandConversationEnum {
  None,
  Yes,
  No,
}

export enum TypeCommandEnum {
  Unselected,
  ActionsUsers,
  Settings,
  Gaming,
  Information,
  Service,
}

export enum PermissionPrivateMessagesTypeEnum {
  None,
  No,
  Yes,
  YesImportant,
}
