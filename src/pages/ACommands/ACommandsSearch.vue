<script lang="ts" setup>
import { UseCommandSearch } from "./useCommandSearch";
import ACommandsFilters from "./ACommandsFilters.vue";
import { icons } from "../../common/consts";

const props = defineProps<{
  commandSearch: UseCommandSearch;
}>();

const { search } = props.commandSearch;
const { Icon16SearchOutline } = icons;
</script>

<template>
  <div class="a-command-search">
    <div style="display: flex; gap: 5px; flex-grow: 1">
      <label class="a-command-search__label">
        <Icon16SearchOutline style="margin-right: 5px" />
        <input ref="reference" v-model="search" placeholder="Поиск" />
      </label>
      <div style="padding: 5px; margin-right: 10px">
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
    class="box-border"
  >
    <ul
      class="items-center text-sm font-medium m-2 select-none text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
    >
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
    </ul>
  </div>
</template>
