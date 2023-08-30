import { computed, Ref, ref } from "vue";
import { refDebounced } from "@vueuse/core";
import { useCommands } from "../../store/commands/commands";
import CommandHelper from "../../helpers/CommandHelper";

export type UseCommandSearch = ReturnType<typeof useCommandSearch>;

export function useCommandSearch() {
  const store = useCommands();
  const search = ref("");
  const searchDebounce: Readonly<Ref<string>> = refDebounced(search, 200);
  const searchCommands = computed(() =>
    store.searchCommand(searchDebounce.value, store.filters),
  );
  const searchDescriptions = computed(() =>
    store.searchDescription(searchDebounce.value, store.filters),
  );
  const commandsOrder = computed(() =>
    CommandHelper.getFiltered(store.commandsOrder, store.filters),
  );
  return {
    store,
    search,
    searchDebounce,
    searchCommands,
    searchDescriptions,
    commandsOrder,
  };
}
