<script lang="ts" setup>
import ATopConversationsTable from "./ATopConversationsTable.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import ATopError from "./ATopError.vue";
import { TopService } from "../../services/TopService";
import ATopBreadcrumbs from "./ATopBreadcrumbs.vue";

const items = await TopService.get("/top/conversations");
</script>
<template>
  <ATopBreadcrumbs caption="Общий топ чатов" />
  <APageContainer style="padding-inline: 0">
    <ATopError v-if="typeof items === 'string'">{{ items }}</ATopError>
    <ATopConversationsTable v-else :items="items" />
  </APageContainer>
</template>
