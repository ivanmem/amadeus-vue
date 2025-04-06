<script lang="ts" setup>
import { useCommandSearch } from "./useCommandSearch";
import { useAppCaption } from "../../hooks/useAppCaption";
import ACommandsSearch from "./ACommandsSearch.vue";
import AButton from "../../components/AButton/AButton.vue";
import { computed, ref } from "vue";
import ACommandsDynamicScroller from "./ACommandsDynamicScroller.vue";
import AMessage from "../../components/AMessage/AMessage.vue";
import { Icon16WarningTriangle, Icon16Cancel } from "vue-vkontakte-icons";
import { useCommands } from "../../store/commands/commands";

useAppCaption("Команды");

const commandsStore = useCommands();
const commandSearch = useCommandSearch();
const {
  searchDescriptions,
  searchCommands,
  searchDebounce,
  commandsOrder,
  searchType,
} = commandSearch;

const aCommandSearchRef = ref<any>();

const currentCommands = computed(() => {
  if (searchDebounce.value.length === 0) {
    return commandsOrder;
  }

  return searchType.value == "name" ? searchCommands : searchDescriptions;
});
</script>

<template>
  <div class="a-commands vkuiGroup__inner Group__inner">
    <ACommandsSearch ref="aCommandSearchRef" :command-search="commandSearch" />
    <ACommandsDynamicScroller
      v-if="currentCommands.value.length > 0"
      :commands="currentCommands.value"
      :lang="commandSearch.searchLang.value"
    />
    <div
      v-if="currentCommands.value.length === 0"
      class="page-padding-inline pt-2.5 flex gap-2.5 flex-col"
    >
      <AMessage class="pl-3 py-2 gap-1">
        <Icon16WarningTriangle style="display: inline" />
        <span>Подходящие команды отсутствуют</span>
      </AMessage>
      <AButton
        class="justify-start pl-3 py-2"
        :icon="Icon16Cancel"
        @click="
          commandsStore.resetFilters();
          commandSearch.search.value = '';
          commandSearch.searchType.value = 'name';
        "
      >
        Сбросить фильтры
      </AButton>
    </div>
  </div>
</template>

<style lang="scss">
.a-commands {
  background: var(--vkui--color_background_content);
  color: var(--vkui--color_text_primary);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
}

.a-commands__commands {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 8px;
  overflow: auto;
  padding-block: 12px;
  padding-top: 10px;
}

.a-commands__header {
  align-items: center;
  border-bottom: 1px solid currentColor;
  display: flex;
  gap: 8px;
  padding: 8px var(--vkui--size_base_padding_horizontal--regular);
}
</style>
