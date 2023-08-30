<script lang="ts" setup>
import ACommandLink from "./ACommandLink.vue";
import { useCommandSearch } from "./useCommandSearch";
import { icons } from "../../common/consts";
import { useAppCaption } from "../../hooks/useAppCaption";
import ACommandsSearch from "./ACommandsSearch.vue";
import { ref } from "vue";

useAppCaption("Команды");

const commandSearch = useCommandSearch();
const {
  searchDescriptions,
  searchCommands,
  store,
  searchDebounce,
  commandsOrder,
} = commandSearch;
const aCommandSearchRef = ref<any>();

const { Icon12ErrorCircle } = icons;
</script>

<template>
  <div class="a-commands vkuiGroup__inner Group__inner">
    <ACommandsSearch ref="aCommandSearchRef" :command-search="commandSearch" />
    <div class="a-commands__commands">
      <template v-if="searchDebounce.length === 0">
        <ACommandLink
          v-for="command in commandsOrder"
          :key="command.id"
          :command="command"
        />
      </template>
      <template v-if="searchCommands.length">
        <div class="a-commands__header">
          <Icon12ErrorCircle />
          Совпадение по названию:
        </div>
        <ACommandLink
          v-for="command in searchCommands"
          :key="command.id"
          :command="command"
        />
      </template>
      <template v-if="searchDescriptions.length">
        <div class="a-commands__header">
          <Icon12ErrorCircle />
          Совпадение по описанию:
        </div>
        <ACommandLink
          v-for="command in searchDescriptions"
          :key="command.id"
          :command="command"
        />
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import "/src/styles/variables.scss";

.a-commands {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: auto;
  background: var(--vkui--color_background_content);
  color: var(--vkui--color_text_primary);
}

.a-commands__commands {
  display: flex;
  flex-grow: 1;
  overflow: auto;
  flex-direction: column;
  gap: 8px;
  padding-block: 12px;
}

.a-commands__header {
  display: block;
  padding: 8px var(--vkui--size_base_padding_horizontal--regular);
  border-bottom: 1px solid currentColor;
}
</style>
