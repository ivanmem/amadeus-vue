<script lang="ts" setup>
import ATable from "../../components/ATable/ATable.vue";
import { ATableHeader } from "../../components/ATable/types";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import ATopError from "./ATopError.vue";
import { TopService } from "../../services/TopService";
import ATopBreadcrumbs from "./ATopBreadcrumbs.vue";
import ACellCrownWrapper from "./ACellCrownWrapper.vue";

const headers: ATableHeader[] = [
  { value: "name", text: "Название", sortable: true },
  {
    value: "countSms",
    text: "Сообщений",
    sortable: true,
  },
];
const items = await TopService.get("/top/users/today");
const formater = new Intl.NumberFormat("ru-RU");
</script>
<template>
  <ATopBreadcrumbs caption="Сегодняшний топ пользователей" />
  <APageContainer style="padding-inline: 0">
    <ATopError v-if="typeof items === 'string'">{{ items }}</ATopError>
    <ATable v-else :headers="headers" :items="items">
      <template #item-countSms="{ countSms }">
        {{ formater.format(countSms) }}
      </template>
      <template #item-name="{ name, __index }">
        <ACellCrownWrapper :index="__index">
          {{ name }}
        </ACellCrownWrapper>
      </template>
    </ATable>
  </APageContainer>
</template>
