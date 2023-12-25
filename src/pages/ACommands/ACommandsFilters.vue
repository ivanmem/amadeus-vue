<script lang="ts" setup>
import {
  CREATOR_COMMANDS_OPTIONS,
  TYPES_COMMAND_OPTIONS,
} from "../../helpers/CommandHelper.js";
import AButton from "../../components/AButton/AButton.vue";
import { useCommands } from "../../store/commands/commands";
import ASelect from "../../components/ASelect/ASelect.vue";
import FixedTeleport from "../../components/FixedTeleport.vue";
import { icons } from "../../common/consts";
import { useApp } from "../../store/app/app";
import AModal from "../../components/AModal/AModal.vue";
import { reactive } from "vue";
import AToggle from "../../components/AToggle/AToggle.vue";
import ACaption from "../../components/ACaption.vue";

const commandsStore = useCommands();
const appStore = useApp();
const { Icon24QuestionOutline } = icons;
const show = reactive({
  filters: false,
});
</script>
<template>
  <FixedTeleport mounted to="#navigation-header__right">
    <AModal v-model="show.filters">
      <template #button>
        <AButton
          class="a-button__opacity"
          icon="Icon24Filter"
          @click="show.filters = !show.filters"
        />
      </template>
      <template #header> Фильтры</template>
      <template #content>
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
          <div class="flex gap-3">
            <div>
              <ACaption> Избранное </ACaption>
              <AToggle v-model="commandsStore.filters.favorite" />
            </div>
            <div>
              <ACaption> Отключённые </ACaption>
              <AToggle v-model="commandsStore.filters.disabled" />
            </div>
          </div>
        </div>
      </template>
    </AModal>
    <AButton @click="appStore.initSlides()">
      <Icon24QuestionOutline />
    </AButton>
  </FixedTeleport>
</template>
<style lang="scss"></style>
