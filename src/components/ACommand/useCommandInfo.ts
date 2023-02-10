import { useCommands } from "../../store/commands/commands";
import { computed } from "vue";
import { ACommandProps } from "./types";

export function useCommandInfo(props: ACommandProps) {
  const store = useCommands();
  const command = computed(() => store.getCommandById(props.id));
  const nameCommand = computed(() => store.getCommandFullName(props.id));
  const relatedCommands = computed(() =>
    command.value.relatedCommands?.filter((x) => x != command.value.id)
  );
  return {
    store,
    command,
    nameCommand,
    relatedCommands,
  };
}
