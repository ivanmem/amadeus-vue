<script lang="ts" setup>
const props = defineProps<{ index: number }>();
const params = {
  size: [20, 18, 16],
  padding: [0, 1, 2],
  color: ["#b1b100", "#bababa", "e27305"],
};
import { icons } from "../../common/consts";
</script>
<template>
  <slot v-if="index >= params.size.length" />
  <div v-else class="a-cell-crown-wrapper">
    <component
      :is="icons.Icon12Crown"
      :height="params.size[index]"
      :style="{
        color: params.color[index],
        paddingInline: params.padding[index] + 'px',
      }"
      :width="params.size[index]"
      class="a-cell-crown-wrapper__icon"
    />
    <div class="a-cell-crown-wrapper__content">
      <slot />
    </div>
    <div class="a-cell-crown-wrapper__right"></div>
  </div>
</template>
<style lang="scss">
.a-cell-crown-wrapper {
  align-items: center;
  display: flex;
  gap: 5px;
  justify-content: space-between;

  .a-cell-crown-wrapper__icon {
    box-sizing: border-box;
    flex-basis: 20px;
    min-width: 20px;
  }

  .a-cell-crown-wrapper__content {
    flex-grow: 1;
    min-width: 0;
    text-overflow: ellipsis;
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .a-cell-crown-wrapper__right {
    flex-basis: 20px;
    min-width: 0;
  }
}
</style>
