import { useCommands } from "../../store/commands/commands";
import { computed } from "vue";
import { ACommandProps } from "./types";
import { stringIsCyrillic } from "../../helpers/stringIsCyrillic";
import { stringIsSpecialChar } from "../../helpers/stringIsSpecialChar";
import { Command } from "../../store/commands/types";

export function useCommandInfo(props: ACommandProps) {
  const store = useCommands();
  const command = computed<Command | undefined>(() =>
    store.getCommandById(props.id),
  );
  const parentCommand = computed(() =>
    command.value?.idOriginal
      ? store.getCommandById(command.value.idOriginal)
      : undefined,
  );
  const aliases = computed(() => {
    return command.value?.alias.map((alias, index) => {
      const aliasEndIndex = command.value!.alias.length - index;
      const aliasIsNotEnglish =
        stringIsCyrillic(alias) || stringIsSpecialChar(alias);
      const parentAlias = (() => {
        if (!parentCommand.value) {
          return "";
        }

        const parentAliases = parentCommand.value.alias;
        // если текущий алиас на русском - то используем индекс с начала, а если он на английском - то используем индекс с конца
        const parentCurrentAlias = parentAliases.at(
          aliasIsNotEnglish ? index : aliasEndIndex,
        );
        // если язык предсказанного родительского алиаса совпадает с текущим, то используем его
        if (
          parentCurrentAlias &&
          aliasIsNotEnglish === stringIsCyrillic(parentCurrentAlias)
        ) {
          return parentCurrentAlias;
        }

        // возвращаем самый первый попавшийся русский или английский родительский алиас, в зависимости от языка алиаса
        return parentAliases[aliasIsNotEnglish ? 0 : parentAliases.length - 1];
      })();

      return `${parentAlias} ${alias}`.trim();
    });
  });
  const nameCommand = computed(() => store.getCommandFullName(props.id));
  const relatedCommands = computed(
    () => command.value?.relatedCommands?.filter((x) => x != command.value!.id),
  );
  return {
    store,
    command,
    parentCommand,
    aliases,
    nameCommand,
    relatedCommands,
  };
}
