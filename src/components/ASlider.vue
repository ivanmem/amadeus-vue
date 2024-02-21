<script lang="ts" setup>
import Slider from "@vueform/slider";

defineProps<{ modelValue: any; min: number; max: number }>();
const emit = defineEmits<{
  "update:model-value": [any];
}>();
</script>

<template>
  <Slider
    :max="max"
    :min="min"
    :model-value="modelValue"
    @update:model-value="emit('update:model-value', $event)"
  />
</template>

<style lang="scss">
@import "../../node_modules/@vueform/slider/themes/tailwind.scss";

.slider-base {
  @apply bg-gray-300;
}

.slider-connect {
  @apply bg-blue-500 slider-disabled:bg-gray-400;
}

.slider-handle {
  @apply bg-white focus:ring-blue-500;
}

.slider-tooltip {
  @apply border-blue-500 bg-blue-500 slider-disabled:bg-gray-400 slider-disabled:border-gray-400;
}
</style>
