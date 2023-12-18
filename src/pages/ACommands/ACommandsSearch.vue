<script lang="ts" setup>
import { UseCommandSearch } from "./useCommandSearch";
import ACommandsFilters from "./ACommandsFilters.vue";
import { icons } from "../../common/consts";
import { computed } from "vue";
import AMessage from "../../components/AMessage/AMessage.vue";
import ASearch from "../../components/ASearch.vue";

const props = defineProps<{
  commandSearch: UseCommandSearch;
}>();

const { search } = props.commandSearch;
const IconSearch = computed(() =>
  search.value.length ? icons.Icon16Cancel : icons.Icon16SearchOutline,
);
</script>

<template>
  <div class="a-command-search">
    <div style="display: flex; gap: 5px; flex-grow: 1; padding-right: 6px">
      <ASearch v-model="search" />
      <div style="padding: 5px">
        <ACommandsFilters />
      </div>
    </div>
    <div
      aria-hidden="true"
      class="vkuiSearch__separator Search__separator vkuiSeparator Separator vkuiSeparator--wide Separator--wide"
      role="separator"
    >
      <div class="vkuiSeparator__in Separator__in"></div>
    </div>
  </div>
  <div
    v-if="props.commandSearch.searchDebounce.value.length > 0"
    class="a-command-search__types box-border"
  >
    <AMessage is="ul">
      <li
        v-for="type of props.commandSearch.searchTypes"
        :key="type.value"
        class="w-full border-b border-gray-200 sm:border-b-0 last:border-b-0 sm:border-r last:border-r-0 dark:border-gray-600"
      >
        <div class="flex items-center pl-3">
          <input
            :id="`search-radio-${type.value}`"
            v-model="props.commandSearch.searchType.value"
            :value="type.value"
            class="w-4 h-4 select-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            name="list-radio"
            type="radio"
          />
          <label
            :for="`search-radio-${type.value}`"
            class="w-full py-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            {{ type.label }}
          </label>
        </div>
      </li>
    </AMessage>
  </div>
</template>
<style lang="scss">
.a-command-search__types {
  padding-inline: var(--page-padding-inline);
  padding-top: 10px;
}
</style>
