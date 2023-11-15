import { useCommands } from "../store/commands/commands";
import { Command } from "../store/commands/types";
import { IEnumerable } from "linq-to-typescript";

class CommandsService {
  // сортировка команд по полному названию
  orderBy(commands: IEnumerable<Command>) {
    const store = useCommands();
    return commands.orderBy((x) => store.getCommandFullName(x.id));
  }
}

const commandsService = new CommandsService();

export default commandsService;
