<script lang="ts" setup>
import ATable from "../../components/ATable/ATable.vue";
import { conversationHeaders } from "./consts";
import ACellCrownWrapper from "./ACellCrownWrapper.vue";

const props = defineProps<{ items: object[] }>();
const formatter = new Intl.NumberFormat("ru-RU");
</script>
<template>
  <ATable
    :headers="conversationHeaders"
    :items="items"
    :search-field="['name', 'owner.name']"
  >
    <template #item-percentBot="{ percentBot }">
      {{ percentBot ?? 0 }}%
    </template>
    <template #item-peerId="{ peerId }">
      {{ peerId - 2000000000 }}
    </template>
    <template #item-countSms="{ countSms }">
      {{ formatter.format(countSms) }}
    </template>
    <template #item-owner.name="{ owner }">
      <a
        v-if="owner"
        :href="`https://vk.com/id${owner.id}`"
        target="_blank"
      >
        {{ owner.name }}
      </a>
    </template>
    <template #item-name="{ name, link, __index }">
      <ACellCrownWrapper :index="__index - 1">
        <a :href="link" target="_blank">{{ name }}</a>
      </ACellCrownWrapper>
    </template>
  </ATable>
</template>
