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
  align-items: center;
  display: flex;
}

.navigation-bottom-buttons {
  align-items: center;
  background: var(--navigation-bottom-background);
  border-color: var(--vkui--color_separator_primary);
  box-shadow: 0 0 2px 0 var(--vkui--color_separator_primary);
  display: flex;
  min-width: 100%;
  overflow: auto;
  padding: 4px 6px 3px;

  & > * {
    flex-grow: 1;
  }

  @at-root .root:not([data-platform="vkcom"]) & {
    justify-content: space-around;
    align-content: space-around;
  }

  .a-button {
    background-color: transparent;
    color: var(--navigation-bottom-color);
    flex-direction: column;
    font-size: 10px;
    gap: 3px;
    line-height: 100%;
    padding: 0;
    white-space: nowrap;

    @at-root .root[data-platform="vkcom"] & {
      flex-direction: row;
      font-size: 14px;
      gap: 6px;
    }

    &[data-type="accent"] {
      color: var(--vkui--color_background_accent_themed);
    }

    .a-button__icon {
      height: 28px;
      margin: 0;
      width: 28px;
    }
  }
}
</style>
