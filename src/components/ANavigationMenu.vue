<script lang="ts" setup>
import AButton from "./AButton/AButton.vue";
import { useRoute } from "vue-router";
import { useApp } from "../store/app/app";

const route = useRoute();
const appService = useApp();
</script>
<template>
  <div class="navigation">
    <div class="navigation-bottom-buttons">
      <AButton
        :data-type="route.path.startsWith('/command/') ? 'accent' : undefined"
        icon="Icon24ArticleBoxOutline"
        to="/command/"
      >
        <span> Команды </span>
      </AButton>
      <AButton
        :data-type="route.path.startsWith('/top/') ? 'accent' : undefined"
        icon="Icon24CupOutline"
        to="/top"
      >
        <span>Топы</span>
      </AButton>
      <AButton icon="Icon24FlashOutline" to="/events">
        <span>События</span>
      </AButton>
      <AButton icon="Icon24CrownOutline" to="/roles">
        <span> О ролях </span>
      </AButton>
      <AButton
        v-if="!appService.isApp"
        icon="Icon24DollarCircleOutline"
        to="/don"
      >
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
  align-content: space-around;
  align-items: center;
  background: var(--navigation-bottom-background);
  box-shadow:
    0 0 2px rgba(0, 0, 0, 0.08),
    0 4px 16px rgba(0, 0, 0, 0.08);
  box-shadow: var(--vkui--elevation3);
  display: flex;
  justify-content: space-around;
  min-width: 100%;
  overflow: auto;

  .a-button {
    background-color: transparent;
    color: var(--navigation-bottom-color);
    flex-basis: 0;
    flex-direction: column;
    flex-grow: 1;
    flex-shrink: 0;
    gap: 2px;
    height: var(--vkui_internal--tabbar_height);
    justify-content: center;
    max-width: 100%;
    min-width: 0;
    outline: none;
    padding: 4px 2px 2px;
    position: relative;
    text-decoration: none;

    span {
      display: block;
      font-family:
        -apple-system,
        system-ui,
        Helvetica Neue,
        Roboto,
        sans-serif;
      font-family: var(--vkui--font_footnote--font_family--regular);
      font-size: 10px;
      font-weight: var(--vkui--font_weight_accent2);
      line-height: 100%;
      max-width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    @at-root .root[data-platform="vkcom"] & {
      flex-direction: row;
      gap: 8px;

      span {
        font-size: 14px;
      }
    }

    &[data-type="accent"] {
      color: var(--vkui--color_text_accent_themed);
    }

    .a-button__icon {
      height: 28px;
      margin: 0;
      width: 28px;
    }
  }
}
</style>
