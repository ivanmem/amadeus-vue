<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATable from "../../components/ATable/ATable.vue";
import { useCommands } from "../../store/commands/commands";
import AButton from "../../components/AButton/AButton.vue";
import { router } from "../../router";
import { ATableHeader } from "../../components/ATable/types";
import APageContainer from "../../components/APageContainer/APageContainer.vue";

useAppCaption("Топ команд (за всё время)");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/commands",
).then((x) => x.json());

const headers: ATableHeader[] = [
  { value: "commandId", text: "Название", sortable: true },
  {
    value: "countExecute",
    text: "Использований",
    sortable: true,
  },
];
const commands = useCommands();
</script>
<template>
  <APageContainer style="padding-inline: 0">
    <ATable :headers="headers" :items="items">
      <template #item-commandId="{ commandId }">
        <AButton class="opacity" @click="router.push('/command/' + commandId)">
          {{ commands.getCommandFullName(commandId) }}
        </AButton>
      </template>
    </ATable>
  </APageContainer>
</template>
