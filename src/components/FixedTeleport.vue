<script lang="ts" setup>
import { useActivated } from "../composables/useActivated";
import { PropType } from "vue";

const props = defineProps({
  to: {
    type: [String, Object] as PropType<any>,
  },
  disabled: Boolean,
});

const isActivated = useActivated();
</script>
<template>
  <Teleport :disabled="!isActivated || props.disabled" :to="props.to">
    <slot />
  </Teleport>
</template>
