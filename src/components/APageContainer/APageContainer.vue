<template>
  <div class="a-page-container vkuiGroup__inner Group__inner">
    <slot />
  </div>
</template>
<style lang="scss">
.a-page-container {
  background: var(--vkui--color_background_content);
  color: var(--vkui--color_text_primary);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 5px;
  overflow: auto;
  padding: var(--page-padding);
}
</style>
