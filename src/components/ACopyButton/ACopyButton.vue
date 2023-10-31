<script lang="ts" setup>
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
  <AButton :tag="tag" class="a-copy-button opacity">
    <template #icon="iconProps">
      <CopyIcon v-bind="iconProps" />
    </template>
    <slot />
  </AButton>
</template>
<style lang="scss">
.a-copy-button {
  display: flex;
  min-height: 0;
  padding: 0;
  vertical-align: top;
}
</style>
