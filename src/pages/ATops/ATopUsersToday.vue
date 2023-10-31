<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATable from "../../components/ATable/ATable.vue";
import { ATableHeader } from "../../components/ATable/types";

useAppCaption("Топ пользователей (за сегодня)");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/users/today",
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
  <ATable :headers="headers" :items="items" />
</template>
