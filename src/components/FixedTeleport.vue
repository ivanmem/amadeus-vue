<script lang="ts" setup>
import { useActivated } from "../composables/useActivated";
import { computed, PropType } from "vue";
import { useMounted } from "@vueuse/core";

const props = defineProps({
  to: {
    type: [String, Object] as PropType<any>,
  },
  disabled: Boolean,
  mounted: Boolean,
});

const isActivated = useActivated();
const isMounted = useMounted();

const show = computed(() => {
  if (props.mounted) {
    return isMounted.value;
  }

  return true;
});
</script>
<template>
  <Teleport
    v-if="show"
    :disabled="!isActivated || props.disabled"
    :to="props.to"
  >
    <slot />
  </Teleport>
</template>
