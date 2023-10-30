<script lang="ts" setup>
import AButton from "./AButton/AButton.vue";
</script>
<template>
  <div class="navigation">
    <div class="navigation-bottom-buttons">
      <AButton icon="Icon24ArticleBoxOutline" to="/">
        <span> Команды </span>
      </AButton>
      <AButton icon="Icon24CupOutline" to="/top">
        <span>Топы</span>
      </AButton>
      <AButton icon="Icon24FlashOutline" to="/events">
        <span>События</span>
      </AButton>
      <AButton icon="Icon24CrownOutline" to="/roles">
        <span> О ролях </span>
      </AButton>
      <AButton icon="Icon24DollarCircleOutline" to="/don">
        <span>Дон статус</span>
      </AButton>
      <AButton icon="Icon24LightbulbStarOutline" to="/about">
        <span>Source</span>
      </AButton>
    </div>
  </div>
</template>
<style lang="scss">
.navigation {
  display: flex;
  align-items: center;
}

.navigation-bottom-buttons {
  display: flex;
  align-items: center;
  overflow: auto;
  background: var(--navigation-bottom-background);
  min-width: 100%;
  padding: 4px 6px 3px;
  border-color: var(--vkui--color_separator_primary);
  box-shadow: 0 0 2px 0 var(--vkui--color_separator_primary);

  & > * {
    flex-grow: 1;
  }

  @at-root .root:not([data-platform="vkcom"]) & {
    justify-content: space-around;
    align-content: space-around;
  }

  .a-button {
    flex-direction: column;
    gap: 3px;
    min-height: 26px;
    white-space: nowrap;
    padding: 0;
    background-color: transparent;
    color: var(--navigation-bottom-color);
    font-size: 10px;
    line-height: 100%;

    &[data-type="accent"] {
      color: var(--vkui--color_background_accent_themed);
    }

    .a-button__icon {
      margin: 0;
      width: 28px;
      height: 28px;
    }
  }
}
</style>
