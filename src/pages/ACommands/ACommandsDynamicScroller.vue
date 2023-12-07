<script lang="ts" setup>
import { DynamicScroller, DynamicScrollerItem } from "vue-virtual-scroller";
import ACommandLink from "./ACommandLink.vue";
import { ILang } from "../../types/ILang";
import { Command } from "../../store/commands/types";

const props = defineProps<{
  commands: Command[];
  lang: ILang;
}>();
</script>
<template>
  <DynamicScroller
    :items="commands"
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
        <ACommandLink :key="item.id" :command="item" :lang="lang" />
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
