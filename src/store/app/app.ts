import { defineStore } from "pinia";
import { platform } from "@vkontakte/vkui";
import random from "lodash/random";
import bridge from "@vkontakte/vk-bridge";
import {
  MobileUpdateConfigData,
  MVKUpdateConfigData,
  VKUpdateConfigData,
} from "@vkontakte/vk-bridge/dist/types/src/types/data";
import { watch } from "vue";
import { setEruda } from "../../helpers/setEruda";

interface AppState {
  caption: string;
  loadingSet: Set<any>;
  platform: string;
  webAppConfig: Partial<
    MobileUpdateConfigData & MVKUpdateConfigData & VKUpdateConfigData
  >;
  urlParams: Record<any, any>;
  config: IAppConfig;
}

export interface IAppConfig {
  eruda?: boolean;
}

export const useApp = defineStore("app", {
  state(): AppState {
    return {
      caption: "",
      loadingSet: new Set(),
      platform: platform(),
      webAppConfig: {},
      urlParams: {},
      config: {
        eruda: false,
      },
    };
  },
  getters: {
    isLoading(): boolean {
      return this.loadingSet.size !== 0;
    },
    isVkCom(): boolean {
      return this.platform === "vkcom";
    },
    isIos(): boolean {
      return this.platform === "ios";
    },
    isAppIos(): boolean {
      return this.isIos && navigator.userAgent.startsWith("com.vk.vkclient");
    },
    isApp(): boolean {
      return Boolean(this.webAppConfig?.app);
    },
  },
  actions: {
    async init() {
      const appStore = useApp();
      bridge.subscribe((e) => {
        if (e.detail.type === "VKWebAppUpdateConfig") {
          appStore.webAppConfig = e.detail.data;
          return;
        }
      });
      await bridge.send("VKWebAppInit", {});
      this.urlParams = Object.fromEntries(new URLSearchParams(location.search));
      watch(
        () => this.config.eruda,
        useApp().wrapLoading(() => {
          return setEruda(Boolean(this.config.eruda));
        }),
        { immediate: this.config.eruda },
      );
    },
    getLoadingFinisher(): () => void {
      const id = random(true);
      this.loadingSet.add(id);
      return () => this.loadingSet.delete(id);
    },
    wrapLoading<T = any>(action: (...args: any) => T) {
      return async (...args: any) => {
        const loadingFinisher = useApp().getLoadingFinisher();
        try {
          return await action(...args);
        } finally {
          loadingFinisher();
        }
      };
    },
  },
});
