<script setup lang="ts">
import AButton from "../../components/AButton/AButton.vue";
import { computed, h } from "vue";
import { icons } from "../../common/consts";

const props = defineProps({
  tag: { type: String },
  size: { type: Number, default: 16 },
});

const CopyIcon = computed(() =>
  h(icons.Icon16CopyOutline, {
    style: `width: ${props.size}px; height: ${props.size}px;`,
  }),
);
</script>
<template>
  <AButton class="a-copy-button opacity" :tag="tag">
    <template #icon="iconProps">
      <CopyIcon v-bind="iconProps" />
    </template>
    <slot />
  </AButton>
</template>
<style lang="scss">
.a-copy-button {
  display: flex;
  vertical-align: top;
  padding: 0;
  min-height: 0;
}
</style>
