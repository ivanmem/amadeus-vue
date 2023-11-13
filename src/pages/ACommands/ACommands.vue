<script lang="ts" setup>
import ACommandLink from "./ACommandLink.vue";
import { useCommandSearch } from "./useCommandSearch";
import { useAppCaption } from "../../hooks/useAppCaption";
import ACommandsSearch from "./ACommandsSearch.vue";
import { ref } from "vue";
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";

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
</script>

<template>
  <div class="a-commands vkuiGroup__inner Group__inner">
    <ACommandsSearch ref="aCommandSearchRef" :command-search="commandSearch" />

    <DynamicScroller
      v-if="searchDebounce.length === 0"
      :items="commandsOrder"
      :min-item-size="36 + 8"
      class="a-commands__commands"
      key-field="id"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :active="active"
          :data-index="index"
          :item="item"
          style="padding-bottom: 8px"
        >
          <ACommandLink :key="item.id" :command="item" />
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <template v-else>
      <template v-if="searchType == 'name'">
        <DynamicScroller
          :items="searchCommands"
          :min-item-size="36 + 8"
          class="a-commands__commands"
          key-field="id"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :active="active"
              :data-index="index"
              :item="item"
              style="padding-bottom: 8px"
            >
              <ACommandLink :key="item.id" :command="item" />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </template>

      <template v-if="searchType == 'description'">
        <DynamicScroller
          :items="searchDescriptions"
          :min-item-size="36 + 8"
          class="a-commands__commands"
          key-field="id"
        >
          <template v-slot="{ item, index, active }">
            <DynamicScrollerItem
              :active="active"
              :data-index="index"
              :item="item"
              style="padding-bottom: 8px"
            >
              <ACommandLink :key="item.id" :command="item" />
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </template>
    </template>
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
