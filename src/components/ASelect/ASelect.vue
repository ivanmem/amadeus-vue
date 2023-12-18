<script lang="ts" setup>
import uniqueId from "lodash/uniqueId";
import { PropType } from "vue";
import { ASelectOption } from "./types";
import ACaption from "../ACaption.vue";

const props = defineProps({
  label: String,
  options: {
    type: Array as PropType<ASelectOption[]>,
    default: () => [],
  },
  modelValue: [String, Number],
  emptyValue: {
    type: [String, Number, Boolean] as PropType<string | number | false>,
    default: false,
  },
  emptyLabel: String,
});

const emit = defineEmits<{
  "update:modelValue": [string | number | undefined];
}>();

const id = uniqueId("a-select__select");
</script>
<template>
  <div class="a-select">
    <ACaption :for="id"> {{ label }}</ACaption>
    <select
      :id="id"
      class="a-select__element text-sm focus:ring-blue-500 block w-full p-2.5"
      @change="
        emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option
        v-if="emptyValue !== false"
        :selected="modelValue === emptyValue"
        :value="emptyValue"
      >
        {{ emptyLabel ?? "-- Не выбрано --" }}
      </option>
      <option
        v-for="option of options"
        :key="option.value"
        :selected="modelValue === option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
<style lang="scss">
.a-select__element {
  background-color: var(--vkui--color_field_background);
  border: var(--vkui--size_border--regular) solid
    var(--vkui--color_field_border_alpha);
  border-radius: var(--vkui--size_border_radius--regular);
  min-height: var(--vkui--size_field_height--compact);

  &:focus,
  &:active,
  &:target,
  &:focus-visible {
    outline: #2688eb solid var(--vkui--size_border--regular);
    outline-offset: calc(-1 * var(--vkui--size_border--regular));
  }
}
</style>
