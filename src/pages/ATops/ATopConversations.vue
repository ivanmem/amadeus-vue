<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATopConversationsTable from "./ATopConversationsTable.vue";

useAppCaption("Топ чатов (за всё время)");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/conversations",
).then((x) => x.json());
</script>
<template>
  <ATopConversationsTable :items="items" />
</template>
