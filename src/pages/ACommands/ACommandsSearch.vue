<script lang="ts" setup>
import { ref } from "vue";
import { autoUpdate, useFloating } from "@floating-ui/vue";
import { icons } from "../../common/consts.js";
import { UseCommandSearch } from "./useCommandSearch";
import AButton from "../../components/AButton/AButton.vue";
import { TYPES_COMMAND } from "../../helpers/CommandHelper";

const props = defineProps<{
  commandSearch: UseCommandSearch;
}>();

const { search, showFilters, store } = props.commandSearch;
const reference = ref(null);
const floating = ref(null);
const { x, y, strategy } = useFloating(reference, floating, {
  placement: "bottom-end",
  middleware: [],
  whileElementsMounted: autoUpdate,
  open: showFilters,
});

const { Icon24Filter } = icons;
</script>

<template>
  <div class="TopSearch">
    <div style="display: flex; gap: 5px; flex-grow: 1">
      <input
        ref="reference"
        v-model="search"
        class="TopSearch__input"
        placeholder="Поиск"
      />
      <div
        style="
          display: flex;
          gap: 5px;
          flex-grow: 1;
          padding: 5px;
          margin-right: 10px;
        "
      >
        <AButton
          class="a-button__opacity"
          @mousedown.stop
          @click.stop="showFilters = !showFilters"
        >
          <Icon24Filter />
        </AButton>
      </div>
      <div
        v-if="showFilters"
        ref="floating"
        class="a-popup"
        :style="{
          position: strategy,
          top: `${y ?? 0}px`,
          left: `${x ?? 0}px`,
        }"
        @mousedown.stop
        @touchstart.stop
        @click.stop
      >
        <h5 class="vkuiFormItem__top vkuiSubhead vkuiSubhead--sizeY-none">
          Тип
        </h5>
        <select
          v-model="store.filters.type"
          class="a-select"
          style="min-width: 100%"
        >
          <option v-for="(type, index) of TYPES_COMMAND" :value="index">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    <div
      aria-hidden="true"
      class="vkuiSearch__separator Search__separator vkuiSeparator Separator vkuiSeparator--wide Separator--wide"
      role="separator"
    >
      <div class="vkuiSeparator__in Separator__in"></div>
    </div>
  </div>
</template>
