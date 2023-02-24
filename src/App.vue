<script lang="ts" setup>
import { onMounted } from "vue";
import bridge from "@vkontakte/vk-bridge";
import { useRoute } from "vue-router";
import copy from "copy-to-clipboard";
import { useCommands } from "./store/commands/commands";
import AButton from "./components/AButton/AButton.vue";
import { useColorScheme } from "./useColorScheme";

const route = useRoute();
const store = useCommands();
const { currentClasses } = useColorScheme();

onMounted(async () => {
  await bridge.send("VKWebAppInit", {});
});
</script>

<template>
  <div v-if="store.commands" :class="currentClasses" class="root">
    <div class="navigation-header">
      <div id="navigation-header-body" class="overflow-block"></div>
      <AButton
        v-if="route.path !== '/'"
        icon="Icon24Linked"
        @click="copy('vk.com/app51547376#' + route.path)"
      >
        <span>{{ route.path }}</span>
      </AButton>
    </div>
    <div class="route-view">
      <RouterView />
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
}

.navigation {
  display: flex;
  align-items: center;
  padding-inline: 10px;
}

#navigation-header-body {
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
  background: var(--vkui--color_background_content--active);
  min-width: 100%;
  border-radius: 5px;

  .a-button {
    min-height: 26px;
    white-space: nowrap;
  }
}
</style>
