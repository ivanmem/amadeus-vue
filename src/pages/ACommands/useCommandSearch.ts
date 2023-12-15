import { computed, Ref, ref } from "vue";
import { refDebounced } from "@vueuse/core";
import { useCommands } from "../../store/commands/commands";
import CommandHelper from "../../helpers/CommandHelper";
import { from } from "linq-to-typescript";
import { stringIsCyrillic } from "../../helpers/stringIsCyrillic";
import { stringIsSpecialChar } from "../../helpers/stringIsSpecialChar";
import { ILang } from "../../types/ILang";
import { useActivatedRouteQuery } from "../../composables/useActivatedRouteQuery";

export type UseCommandSearch = ReturnType<typeof useCommandSearch>;

export function useCommandSearch() {
  const store = useCommands();
  const search = useActivatedRouteQuery("search", "", { transform: String });
  const searchDebounce: Readonly<Ref<string>> = refDebounced(search, 200);
  const searchCommands = computed(() =>
    store.searchCommand(searchDebounce.value, store.filters),
  );
  const searchDescriptions = computed(() =>
    store.searchDescription(searchDebounce.value, store.filters),
  );
  const commandsOrder = computed(() =>
    CommandHelper.getFiltered(
      from(store.commandsOrder),
      store.filters,
    ).toArray(),
  );
  const searchType = ref<"name" | "description">("name");
  const searchTypes: Array<{ value: typeof searchType.value; label: string }> =
    [
      { value: "name", label: "По названию" },
      { value: "description", label: "По описанию" },
    ];
  const searchLang = computed<ILang>(() => {
    if (search.value.length === 0 || searchType.value !== "name") {
      return "ru";
    }

    return stringIsCyrillic(search.value) || stringIsSpecialChar(search.value)
      ? "ru"
      : "en";
  });

  return {
    store,
    search,
    searchLang,
    searchDebounce,
    searchCommands,
    searchDescriptions,
    commandsOrder,
    searchType,
    searchTypes,
  };
}
