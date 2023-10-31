<script lang="ts" setup>
import ATable from "../../components/ATable/ATable.vue";
import { conversationHeaders } from "./consts";

const props = defineProps<{ items: object[] }>();
</script>
<template>
  <ATable :headers="conversationHeaders" :items="items">
    <template #item-percentBot="{ percentBot }">
      {{ percentBot ?? 0 }}%
    </template>
    <template #item-peerId="{ peerId }">
      {{ peerId - 2000000000 }}
    </template>
    <template #item-name="{ name, link }">
      <a :href="link" target="_blank">{{ name }}</a>
    </template>
  </ATable>
</template>
