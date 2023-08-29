<script lang="ts" setup>
import { computed, StyleValue, useSlots, VueElement } from "vue";
import { icons } from "../../common/consts";
import { RouteLocationRaw, useRoute } from "vue-router";
import { router } from "../../router";
import { isString } from "lodash";

const props = defineProps<{
  icon?: VueElement | keyof typeof icons;
  iconStyle?: StyleValue;
  to?: RouteLocationRaw;
  target?: string | undefined;
  exactActiveDataType?: "accent";
  dataType?: "accent";
  hideContent?: boolean;
  tag?: string;
}>();

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http"),
);

const route = useRoute();

const onClick = computed(() => {
  return (e: MouseEvent) => {
    emit("click", e);
    if (props.to !== undefined) {
      if (isString(props.to) && isExternalLink.value) {
        window.open(props.to, props.target);
      } else {
        router.push(props.to);
      }
    }
  };
});

const link = computed(() => {
  if (!props.to || isExternalLink.value) {
    return undefined;
  }

  return { isExactActive: route.path === props.to };
});

const dataType = computed(() => {
  if (link.value?.isExactActive && !isExternalLink.value) {
    return props.exactActiveDataType ?? "accent";
  }

  return props.dataType;
});

const slots = useSlots();

const hasContent = computed(() => {
  return !!slots.default && !props.hideContent;
});

const iconProps = computed(() => ({
  style: props.iconStyle,
  class: "a-button__icon",
  "data-has-content": hasContent.value,
}));
</script>

<template>
  <component
    :is="tag ?? 'button'"
    v-ripple
    :data-type="dataType"
    class="a-button"
    @click="onClick"
  >
    <template v-if="props.icon">
      <component
        :is="
          typeof props.icon === 'string'
            ? icons[props.icon] ?? props.icon
            : props.icon
        "
        v-bind="iconProps"
      />
    </template>
    <slot name="icon" v-bind="iconProps" />
    <slot v-if="!hideContent" />
  </component>
</template>

<style lang="scss"></style>
