<script lang="ts" setup>
import { onMounted } from "vue";
import bridge from "@vkontakte/vk-bridge";
import { useRoute } from "vue-router";
import copy from "copy-to-clipboard";
import { useCommands } from "./store/commands/commands";
import AButton from "./components/AButton/AButton.vue";
import { useColorScheme } from "./useColorScheme";
import { useApp } from "./store/app/app";
import { icons } from "./common/consts";

const route = useRoute();
const store = useCommands();
const appStore = useApp();
const { currentClasses, darkColorScheme } = useColorScheme();

onMounted(async () => {
  await bridge.send("VKWebAppInit", {});
});

const { Icon24Linked } = icons;
</script>

<template>
  <div
    v-if="store.commands"
    :class="currentClasses"
    class="root"
    :data-dark="darkColorScheme"
  >
    <div class="navigation-header">
      <div class="overflow-block navigation-caption">
        {{ appStore.caption }}
      </div>
      <AButton
        v-if="route.path !== '/'"
        style="height: 30px"
        @click="copy('vk.com/app51547376#' + route.path)"
      >
        <Icon24Linked />
      </AButton>
    </div>
    <div class="route-view">
      <Suspense>
        <router-view v-slot="{ Component }">
          <keep-alive max="3">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </Suspense>
    </div>
    <div class="navigation">
      <div class="navigation-bottom-buttons">
        <AButton icon="Icon24ArticleBoxOutline" to="/">
          <span> Команды </span>
        </AButton>
        <AButton icon="Icon24CrownOutline" to="/roles">
          <span> О ролях </span>
        </AButton>
        <AButton icon="Icon24DollarCircleOutline" to="/don">
          <span>Дон статус</span>
        </AButton>
        <AButton icon="Icon24DollarCircleOutline" to="/events">
          <span>События чата</span>
        </AButton>
        <AButton icon="Icon24DollarCircleOutline" to="/top">
          <span>Топы</span>
        </AButton>
        <AButton icon="Icon24LightbulbStarOutline" to="/about">
          <span> О приложении </span>
        </AButton>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "styles/helpers";
@import "styles/variables";

.root {
  padding-top: 2px;
  padding-block: 10px;
  gap: 10px;
  background: var(--vkui--color_background_content);
  @extend .overflow-block;
}

.route-view {
  @extend .overflow-block;
}

.navigation-header {
  display: flex;
  align-items: center;
  padding-inline: 10px;
  padding-right: var(--navigation-header-padding-right, 10px);
  min-height: 30px;
}

.navigation {
  display: flex;
  align-items: center;
  padding-inline: 10px;
}

.navigation-caption {
  display: flex;
  align-items: flex-start;
  justify-items: center;
  justify-content: center;
  font-weight: bold;
  text-transform: uppercase;
}

.navigation-bottom-buttons {
  display: flex;
  gap: 5px;
  align-items: center;
  overflow: auto;
  padding: 10px;
  background: var(--vkui--color_background);
  min-width: 100%;
  border-radius: 5px;

  .a-button {
    min-height: 26px;
    white-space: nowrap;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s linear;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
