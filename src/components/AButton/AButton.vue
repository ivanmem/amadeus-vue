<script lang="ts" setup>
import { computed, useSlots } from "vue";
import { useLink } from "vue-router";
import { AButtonProps } from "./types";

const props = withDefaults(defineProps<AButtonProps>(), {
  defaultClass: "a-button",
  exactActiveDataType: "accent",
});

const emit = defineEmits<{
  click: [e: MouseEvent];
}>();

const isExternalLink = computed(
  () => typeof props.to === "string" && props.to.startsWith("http"),
);

const link = useLink({
  to: computed(() => (isExternalLink.value ? "/" : (props.to ?? "/"))),
  replace: computed(() => props.replace),
});

const tag = computed(() =>
  (props.tag ?? props.to)
    ? isExternalLink.value
      ? "a"
      : "router-link"
    : "button",
);

const target = computed(() =>
  (props.target ?? isExternalLink.value) ? "_blank" : "_self",
);

const onClick = (e: MouseEvent) => {
  emit("click", e);
  if (!props.to) {
    return;
  }

  if (typeof props.to === "string" && isExternalLink.value) {
    if (tag.value !== "a") {
      window.open(props.to, target.value);
      return;
    }
  } else if (!isExternalLink.value) {
    e.preventDefault();
    link.navigate(e);
  }
};

const dataType = computed(() => {
  if (!props.to || isExternalLink.value) {
    return undefined;
  }

  if (link.isActive.value && props.activeDataType) {
    return props.activeDataType;
  }

  if (link.isExactActive.value && props.exactActiveDataType) {
    return props.exactActiveDataType;
  }

  return props.dataType;
});

const slots = useSlots();

const hasContent = computed(() => {
  return !!slots.default && !props.hideContent;
});

const iconProps = computed(() => ({
  style: props.iconStyle,
  class: ["a-button__icon", props.iconClass],
  "data-has-content": hasContent.value,
}));

const componentProps = computed(() => {
  const value: Record<any, any> = {};
  if (props.to) {
    switch (tag.value) {
      case "a":
        value.href = props.to;
        value.target = "_blank";
        break;
      case "router-link":
        value.to = props.to;
        break;
    }
  }

  return value;
});
</script>

<template>
  <component
    :is="tag ?? 'button'"
    :="componentProps"
    :class="[props.defaultClass, props.class]"
    :data-type="dataType"
    @click="onClick"
  >
    <component v-if="props.icon" :is="props.icon" v-bind="iconProps" />
    <slot name="icon" v-bind="iconProps" />
    <slot v-if="!hideContent" />
  </component>
</template>

<style lang="scss"></style>
