<script lang="ts" setup>
import ATable from "../../components/ATable/ATable.vue";
import { useCommands } from "../../store/commands/commands";
import AButton from "../../components/AButton/AButton.vue";
import { router } from "../../router";
import { ATableHeader } from "../../components/ATable/types";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import ATopError from "./ATopError.vue";
import { TopService } from "../../services/TopService";
import ATopBreadcrumbs from "./ATopBreadcrumbs.vue";
import ACellCrownWrapper from "./ACellCrownWrapper.vue";

const headers: ATableHeader[] = [
  { value: "commandId", text: "Название", sortable: true, width: 100 },
  {
    value: "countExecute",
    text: "Использований",
    sortable: true,
    width: 60,
  },
];
const commands = useCommands();
const items = await TopService.get("/top/commands");
const formater = new Intl.NumberFormat("ru-RU");
</script>
<template>
  <ATopBreadcrumbs caption="Общий топ команд" />
  <APageContainer style="padding-inline: 0">
    <ATopError v-if="typeof items === 'string'">{{ items }}</ATopError>
    <ATable v-else :headers="headers" :items="items">
      <template #item-commandId="{ commandId, __index }">
        <ACellCrownWrapper :index="__index">
          <div class="flex flex-grow justify-center">
            <AButton
              class="opacity whitespace-pre-wrap"
              @click="router.push('/command/' + commandId)"
            >
              {{ commands.getCommandFullName(commandId) }}
            </AButton>
          </div>
        </ACellCrownWrapper>
      </template>
      <template #item-countExecute="{ countExecute }">
        {{ formater.format(countExecute) }}
      </template>
    </ATable>
  </APageContainer>
</template>
