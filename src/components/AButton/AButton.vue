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

<style lang="scss"></style>
