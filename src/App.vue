<script lang="ts" setup>
import { onMounted, shallowRef, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCommands } from "./store/commands/commands";
import AButton from "./components/AButton/AButton.vue";
import { useColorScheme } from "./useColorScheme";
import { useApp } from "./store/app/app";
import { icons } from "./common/consts";
import ANavigationMenu from "./components/ANavigationMenu.vue";
import { useVk } from "./store/vk/vk";

const router = useRouter();
const route = useRoute();
const store = useCommands();
const appStore = useApp();
const vkService = useVk();
useColorScheme();

onMounted(async () => {
  await appStore.init();
});

watch(
  () => appStore.platform,
  () => {
    document.body.dataset.platform = appStore.platform;
  },
  { immediate: true },
);
watch(
  () => appStore.webAppConfig,
  () => {
    if (!appStore.webAppConfig) {
      return;
    }

    document.body.dataset.app = appStore.webAppConfig.app ? "true" : "false";
    if (appStore.webAppConfig.insets) {
      const { top, left, right, bottom } = appStore.webAppConfig.insets;
      document.body.style.padding = `${top}px ${right}px ${bottom}px ${left}px`;
    } else if (appStore.isAppIos) {
      document.body.style.paddingBottom = "8px";
    }
  },
  { immediate: true },
);

const { Icon24Linked, Icon24CopyOutline, Icon24QuestionOutline } = icons;

const LinkIcon = shallowRef(Icon24Linked);
watch(
  () => route.path,
  () => {
    LinkIcon.value = Icon24Linked;
  },
);
</script>

<template>
  <div v-if="store.docs" class="app">
    <div class="navigation-header">
      <div id="navigation-caption" class="overflow-block navigation-caption">
        <template v-if="appStore.caption.length">
          {{ appStore.caption }}
        </template>
      </div>
      <div class="navigation-header__buttons">
        <div id="navigation-header__right"></div>
        <AButton
          v-show="route.path !== '/'"
          @click="
            vkService.copyText('vk.com/app51547376#' + route.path);
            LinkIcon = Icon24CopyOutline;
          "
        >
          <LinkIcon />
        </AButton>
      </div>
    </div>
    <div class="route-view">
      <Suspense>
        <RouterView v-slot="{ Component }">
          <KeepAlive max="3">
            <component :is="Component" />
          </KeepAlive>
        </RouterView>
      </Suspense>
    </div>
    <ANavigationMenu />
  </div>
</template>

<style lang="scss">
@use "styles/mixins";
@use "styles/helpers";

.app {
  padding-top: var(--page-padding-top);
  @extend .overflow-block;
}

.route-view {
  @extend .overflow-block;
}

.navigation-header {
  align-items: center;
  display: flex;
  max-height: var(--navigation-header-height);
  min-height: var(--navigation-header-height);
  padding-left: 8px;
  padding-right: var(--navigation-header-padding-right, 10px);
  user-select: none;

  svg {
    color: white;
  }

  a,
  span {
    color: currentColor;
  }

  a {
    &:active {
      background-color: var(--navigation-background-color-active);
    }
  }

  .a-button {
    background-color: var(--navigation-background-color);
    color: currentColor;
    max-height: var(--navigation-header-height);
    min-height: var(--navigation-header-height);
    overflow: hidden;
    padding-inline: 8px;

    svg {
      color: white;

      @include mixins.platform(height, 20px, 18px, 16px);
      @include mixins.platform(width, 20px, 18px, 16px);
    }

    &:active {
      background-color: var(--navigation-background-color-active);
    }
  }
}

.navigation-caption {
  align-items: flex-start;
  display: flex;
  font-size: 12px;
  font-weight: bold;
  justify-content: center;
  justify-items: center;
  line-height: 120%;
  min-width: 0;
  overflow: hidden;
  text-transform: uppercase;
}

.navigation-header__buttons {
  display: flex;
  gap: 3px;

  #navigation-header__right {
    display: inherit;
    gap: inherit;
  }
}
</style>
