<script lang="ts" setup>
import { computed, useSlots } from "vue";
import { icons } from "../../common/consts";
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
  to: computed(() => (isExternalLink.value ? "/" : props.to ?? "/")),
  replace: computed(() => props.replace),
});

const onClick = (e: MouseEvent) => {
  emit("click", e);
  if (!props.to) {
    return;
  }

  if (typeof props.to === "string" && isExternalLink.value) {
    window.open(props.to, props.target);
  } else if (!isExternalLink.value) {
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
</script>

<template>
  <component
    :is="tag ?? 'button'"
    :class="[props.defaultClass, props.class]"
    :data-type="dataType"
    custom
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
