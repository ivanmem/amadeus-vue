<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATable from "../../components/ATable/ATable.vue";
import { ATableHeader } from "../../components/ATable/types";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import ATopError from "./ATopError.vue";
import { TopService } from "../../services/TopService";

useAppCaption("Топ пользователей за сегодня");
const headers: ATableHeader[] = [
  { value: "name", text: "Название", sortable: true },
  {
    value: "countSms",
    text: "Количество сообщений",
    sortable: true,
  },
];
const items = await TopService.get("/top/users/today");
const formater = new Intl.NumberFormat("ru-RU");
</script>
<template>
  <APageContainer style="padding-inline: 0">
    <ATopError v-if="typeof items === 'string'">{{ items }}</ATopError>
    <ATable v-else :headers="headers" :items="items">
      <template #item-countSms="{ countSms }">
        {{ formater.format(countSms) }}
      </template>
    </ATable>
  </APageContainer>
</template>
