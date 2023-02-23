<script lang="ts" setup>
import { computed, StyleValue, VueElement } from "vue";
import { icons } from "../../common/consts";
import { RouteLocationRaw } from "vue-router";
import { router } from "../../router";
import { isString } from "lodash";

const props = defineProps<{
  icon?: VueElement | keyof typeof icons;
  iconStyle?: StyleValue;
  to?: RouteLocationRaw;
  target?: string | undefined;
}>();

const emits = defineEmits<{
  click?: (e: MouseEvent) => any;
}>();
const onClick = computed(() => {
  return (e: MouseEvent) => {
    if (emits.click) {
      emits.click(e);
    }

    if (props.to !== undefined) {
      if (isString(props.to) && props.to.startsWith("https:")) {
        window.open(props.to, props.target);
      } else {
        router.push(props.to);
      }
    }
  };
});
</script>

<template>
  <button class="a-button" @click="onClick">
    <template v-if="props.icon">
      <component
        :is="typeof props.icon === 'string' ? icons[props.icon] : props.icon"
        :style="[{ color: 'currentColor' }, props.iconStyle]"
        class="a-button__icon"
      />
    </template>
    <slot />
  </button>
</template>

<style lang="scss">
@import "src/styles/helpers";
@import "src/styles/icons";

.a-button {
  background: var(--vkui--color_background_secondary_alpha);
  border-radius: var(--vkui--size_border_radius--regular, 8px);
  border: 0.5px solid var(--vkui--color_background_contrast_secondary_alpha);
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }

  svg {
    min-width: min-content;
  }
}

.a-button__center {
  display: flex;
  align-items: center;
  justify-content: center;
  width: max-content;
}

.a-button__mini {
  font-size: 10px;
}

.a-button__icon {
  margin-right: 5px;
}

.a-button__opacity {
  @extend .a-button__center;
  @extend .a-icon;
  @extend .pointer;

  background: transparent;
  border: none;
}
</style>
