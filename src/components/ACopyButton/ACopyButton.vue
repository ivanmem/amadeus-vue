<script lang="ts" setup>
import AButton from "../../components/AButton/AButton.vue";
import { computed, h, shallowRef } from "vue";
import { icons } from "../../common/consts";

const props = defineProps({
  tag: { type: String },
  size: { type: Number, default: 16 },
});

const initialCopyIcon = icons.Icon16CopyOutline;
const clickedCopyIcon = icons.Icon16DoneCircle;

const currentCopyIcon = shallowRef(initialCopyIcon);

const CopyIcon = computed(() =>
  h(currentCopyIcon.value, {
    style: `width: ${props.size}px; height: ${props.size}px;`,
  }),
);

let timeout: any;

const onClick = () => {
  clearTimeout(timeout);
  currentCopyIcon.value = clickedCopyIcon;

  timeout = setTimeout(() => {
    currentCopyIcon.value = initialCopyIcon;
  }, 1500);
};
</script>
<template>
  <AButton :tag="tag" class="a-copy-button opacity" @click="onClick">
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
