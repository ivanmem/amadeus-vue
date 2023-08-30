<script setup lang="ts">
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
        label="Тип"
        :options="TYPES_COMMAND_OPTIONS"
        v-model="commandsStore.filters.type"
      />
      <ASelect
        label="Команда только для создателя бота"
        :options="CREATOR_COMMANDS_OPTIONS"
        v-model="commandsStore.filters.isOnlyBotCreator"
      />
    </div>
  </APopover>
</template>
<style lang="scss"></style>
