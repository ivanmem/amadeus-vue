<script setup lang="ts">
import { useAppCaption } from "../../hooks/useAppCaption";
import ATable from "../../components/ATable/ATable.vue";
import { ATableHeader } from "../../components/ATable/types";

useAppCaption("Топ пользователей (за всё время)");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/users"
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
  <ATable :items="items" :headers="headers" />
</template>
