<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATable from "../../components/ATable/ATable.vue";
import { ATableHeader } from "../../components/ATable/types";
import APageContainer from "../../components/APageContainer/APageContainer.vue";

useAppCaption("Топ пользователей за всё время");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/users",
).then((x) => x.json());

const headers: ATableHeader[] = [
  { value: "name", text: "Название", sortable: true },
  {
    value: "countSms",
    text: "Количество сообщений",
    sortable: true,
  },
];
</script>
<template>
  <APageContainer style="padding-inline: 0">
    <ATable :headers="headers" :items="items" />
  </APageContainer>
</template>
