<script lang="ts" setup>
import EasyDataTable from "vue3-easy-data-table";
import { ATableHeader } from "./types";

interface Props {
  items: object[];
  headers: ATableHeader[];
}

const props = defineProps<Props>();
</script>
<template>
  <EasyDataTable
    :headers="headers"
    :items="items"
    :rows-per-page="9999"
    alternating
    hide-footer
    show-index
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </EasyDataTable>
</template>
