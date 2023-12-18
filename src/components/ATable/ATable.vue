<script lang="ts" setup>
import EasyDataTable from "vue3-easy-data-table";
import { ATableHeader } from "./types";
import { ref } from "vue";
import ASearch from "../ASearch.vue";

interface Props {
  items: object[];
  headers: ATableHeader[];
  searchField?: string;
}

const searchValue = ref("");
const props = defineProps<Props>();
</script>
<template>
  <div class="a-table-wrapper overflow-block">
    <div v-if="searchField" class="page-padding-inline">
      <ASearch v-model="searchValue" />
    </div>
    <EasyDataTable
      :headers="headers"
      :index-column-width="30"
      :items="items"
      :rows-per-page="9999"
      :search-field="searchField"
      :search-value="searchValue"
      alternating
      body-text-direction="center"
      border-cell
      class="overflow-block"
      fixed-index
      header-text-direction="center"
      hide-footer
      show-index
      @touchstart.stop
    >
      <template v-for="(_, slot) of $slots" #[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
      <template #empty-message> Нет доступных данных</template>
    </EasyDataTable>
  </div>
</template>
<style lang="scss">
.vue3-easy-data-table__main {
  min-height: 0 !important;
}
</style>
