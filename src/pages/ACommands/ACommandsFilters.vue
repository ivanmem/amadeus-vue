<script lang="ts" setup>
import {
  CREATOR_COMMANDS_OPTIONS,
  TYPES_COMMAND_OPTIONS,
} from "../../helpers/CommandHelper.js";
import AButton from "../../components/AButton/AButton.vue";
import { useCommands } from "../../store/commands/commands";
import ASelect from "../../components/ASelect/ASelect.vue";
import APopover from "../../components/APopover/APopover.vue";

const commandsStore = useCommands();
</script>
<template>
  <APopover>
    <template #button>
      <AButton class="a-button__opacity" icon="Icon24Filter" />
    </template>

    <div class="flex flex-col gap-3">
      <ASelect
        v-model="commandsStore.filters.type"
        :options="TYPES_COMMAND_OPTIONS"
        label="Тип"
      />
      <ASelect
        v-model="commandsStore.filters.isOnlyBotCreator"
        :options="CREATOR_COMMANDS_OPTIONS"
        label="Команда только для создателя бота"
      />
    </div>
  </APopover>
</template>
<style lang="scss"></style>
