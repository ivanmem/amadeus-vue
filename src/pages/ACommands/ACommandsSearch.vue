<script lang="ts" setup>
import { UseCommandSearch } from "./useCommandSearch";
import ACommandsFilters from "./ACommandsFilters.vue";

const props = defineProps<{
  commandSearch: UseCommandSearch;
}>();

const { search } = props.commandSearch;
</script>

<template>
  <div class="TopSearch">
    <div style="display: flex; gap: 5px; flex-grow: 1">
      <input
        ref="reference"
        v-model="search"
        class="TopSearch__input"
        placeholder="Поиск"
      />
      <div
        style="
          display: flex;
          gap: 5px;
          flex-grow: 1;
          padding: 5px;
          margin-right: 10px;
        "
      >
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
</template>
