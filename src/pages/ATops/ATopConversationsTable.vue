<script lang="ts" setup>
import ATable from "../../components/ATable/ATable.vue";
import { conversationHeaders } from "./consts";
import ACellCrownWrapper from "./ACellCrownWrapper.vue";

const props = defineProps<{ items: object[] }>();
const formater = new Intl.NumberFormat("ru-RU");
</script>
<template>
  <ATable :headers="conversationHeaders" :items="items" search-field="name">
    <template #item-percentBot="{ percentBot }">
      {{ percentBot ?? 0 }}%
    </template>
    <template #item-peerId="{ peerId }">
      {{ peerId - 2000000000 }}
    </template>
    <template #item-countSms="{ countSms }">
      {{ formater.format(countSms) }}
    </template>
    <template #item-creator.name="{ creator }">
      <a
        v-if="creator"
        :href="`https://vk.com/id${creator.id}`"
        target="_blank"
      >
        {{ creator.name }}
      </a>
    </template>
    <template #item-name="{ name, link, __index }">
      <ACellCrownWrapper :index="__index">
        <a :href="link" target="_blank">{{ name }}</a>
      </ACellCrownWrapper>
    </template>
  </ATable>
</template>
