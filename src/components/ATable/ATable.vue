<script setup lang="ts">
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
    style="padding: 0 10px"
    alternating
    show-index
    :headers="headers"
    :items="items"
    :rows-per-page="9999"
    hide-footer
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </EasyDataTable>
</template>
