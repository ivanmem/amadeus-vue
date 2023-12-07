<script lang="ts" setup>
import { useCommandSearch } from "./useCommandSearch";
import { useAppCaption } from "../../hooks/useAppCaption";
import ACommandsSearch from "./ACommandsSearch.vue";
import { computed, ref } from "vue";
import ACommandsDynamicScroller from "./ACommandsDynamicScroller.vue";
import AMessage from "../../components/AMessage/AMessage.vue";

useAppCaption("Команды");

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
    <AMessage
      v-if="currentCommands.value.length === 0"
      style="
        flex-grow: 1;
        padding-top: 5px;
        padding-inline: var(--page-padding-inline);
      "
    >
      Подходящие команды отсутствуют.
    </AMessage>
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
}

.a-commands__header {
  align-items: center;
  border-bottom: 1px solid currentColor;
  display: flex;
  gap: 8px;
  padding: 8px var(--vkui--size_base_padding_horizontal--regular);
}
</style>
