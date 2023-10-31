<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATopConversationsTable from "./ATopConversationsTable.vue";

useAppCaption("Каталог чатов");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/conversations/catalog",
).then((x) => x.json());
</script>
<template>
  <ATopConversationsTable :items="items" />
</template>
