<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATopConversationsTable from "./ATopConversationsTable.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";

useAppCaption("Топ чатов (за сегодня)");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/conversations/today",
).then((x) => x.json());
</script>
<template>
  <APageContainer style="padding-inline: 0">
    <ATopConversationsTable :items="items" />
  </APageContainer>
</template>
