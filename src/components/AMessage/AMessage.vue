<script lang="ts" setup>
const props = withDefaults(defineProps<{ is: string }>(), {
  is: "div",
});
</script>
<template>
  <component
    :is="is"
    class="a-message items-center text-sm font-medium select-none text-gray-900 bg-white border border-gray-200 rounded-lg flex dark:bg-gray-700 dark:border-gray-600 dark:text-white"
  >
    <slot />
  </component>
</template>
<style lang="scss">
.a-message {
}
</style>
