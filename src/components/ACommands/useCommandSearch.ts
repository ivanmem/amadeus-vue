import { computed, Ref, ref } from "vue";
import { refDebounced } from "@vueuse/core";
import { useCommands } from "../../store/commands/commands";

export function useCommandSearch() {
  const store = useCommands();
  const search = ref("");
  const searchDebounce: Readonly<Ref<string>> = refDebounced(search, 200);
  const searchCommands = computed(() =>
    store.searchCommand(searchDebounce.value)
  );
  const searchDescriptions = computed(() =>
    store.searchDescription(searchDebounce.value)
  );
  return {
    store,
    search,
    searchDebounce,
    searchCommands,
    searchDescriptions,
  };
}
