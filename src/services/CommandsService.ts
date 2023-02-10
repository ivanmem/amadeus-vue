import { useCommands } from "../store/commands/commands";
import { Command } from "../store/commands/types";
import orderBy from "lodash/orderBy";

class CommandsService {
  // сортировка команд по полному названию
  orderBy(commands: Command[]) {
    const store = useCommands();
    return orderBy(commands, [(x) => store.getCommandFullName(x.id)], "asc");
  }
}

const commandsService = new CommandsService();

export default commandsService;
