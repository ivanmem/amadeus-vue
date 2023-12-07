<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATopConversationsTable from "./ATopConversationsTable.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import ATopError from "./ATopError.vue";
import { TopService } from "../../services/TopService";

useAppCaption("Топ чатов (за сегодня)");
const items = await TopService.get("/top/conversations/today");
</script>
<template>
  <APageContainer style="padding-inline: 0">
    <ATopError v-if="typeof items === 'string'">{{ items }}</ATopError>
    <ATopConversationsTable v-else :items="items" />
  </APageContainer>
</template>
