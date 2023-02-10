<script lang="ts" setup>
import { StyleValue, VueElement } from "vue";
import { icons } from "../../common/consts";

const props = defineProps<{
  icon?: VueElement | keyof typeof icons;
  iconStyle?: StyleValue;
}>();
</script>

<template>
  <button class="a-button">
    <template v-if="props.icon">
      <component
        :is="typeof props.icon === 'string' ? icons[props.icon] : props.icon"
        class="a-button__icon"
        :style="props.iconStyle"
      />
    </template>
    <slot />
  </button>
</template>

<style lang="scss">
.a-button {
  border-radius: var(--vkui--size_border_radius--regular, 8px);
  border: none;
  cursor: pointer;

  &:active {
    opacity: 0.8;
  }
}

.a-button__center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.a-button__icon {
  margin-right: 5px;
}
</style>
