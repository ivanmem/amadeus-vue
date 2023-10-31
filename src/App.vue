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
import ANavigationMenu from "./components/ANavigationMenu.vue";

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
    v-if="store.docs"
    :class="currentClasses"
    :data-dark="darkColorScheme"
    :data-platform="appStore.platform"
    class="root"
  >
    <div class="navigation-header">
      <div id="navigation-caption" class="overflow-block navigation-caption">
        <template v-if="appStore.caption.length">
          {{ appStore.caption }}
        </template>
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
    <ANavigationMenu />
  </div>
</template>

<style lang="scss">
@import "styles/helpers";
@import "styles/variables";

.root {
  background: var(--vkui--color_background_content);
  padding-block: 10px 0;
  @extend .overflow-block;
}

.route-view {
  @extend .overflow-block;
}

.navigation-header {
  align-items: center;
  display: flex;
  min-height: 36px;
  padding-left: 8px;
  padding-right: var(--navigation-header-padding-right, 10px);
}

.navigation-caption {
  align-items: flex-start;
  display: flex;
  font-weight: bold;
  justify-content: center;
  justify-items: center;
  text-transform: uppercase;
}
</style>
