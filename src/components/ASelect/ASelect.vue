<script setup lang="ts">
import uniqueId from "lodash/uniqueId";
import { PropType } from "vue";
import { ASelectOption } from "./types";

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
    <label
      :for="id"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >{{ label }}
    </label>
    <select
      :id="id"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      @change="
        emit('update:modelValue', ($event.target as HTMLSelectElement).value)
      "
    >
      <option
        v-if="emptyValue !== false"
        :value="emptyValue"
        :selected="modelValue === emptyValue"
      >
        {{ emptyLabel ?? "-- Не выбрано --" }}
      </option>
      <option
        v-for="option of options"
        :key="option.value"
        :value="option.value"
        :selected="modelValue === option.value"
      >
        {{ option.label }}
      </option>
    </select>
  </div>
</template>
