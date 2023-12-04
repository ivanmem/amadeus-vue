import { defineStore } from "pinia";
import { platform } from "@vkontakte/vkui";
import random from "lodash/random";
import bridge, { ShowSlidesSheetRequest } from "@vkontakte/vk-bridge";
import {
  MobileUpdateConfigData,
  MVKUpdateConfigData,
  VKUpdateConfigData,
} from "@vkontakte/vk-bridge/dist/types/src/types/data";
import { watch, watchEffect } from "vue";
import { setEruda } from "../../helpers/setEruda";
import { useVk } from "../vk/vk";
import { imageUrlToBase64 } from "../../helpers/imageUrlToBase64";

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
  slides?: boolean;
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
        slides: true,
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

      watchEffect(async () => {
        const webAppConfig = this.webAppConfig;
        if (!webAppConfig || !bridge.supports("VKWebAppResizeWindow")) {
          return;
        }

        const { viewport_height: height, viewport_width: width } = webAppConfig;
        if (!width || !height) {
          return;
        }

        await bridge.send("VKWebAppResizeWindow", {
          width,
          height: Math.max(500, height - 200),
        });
      });

      try {
        await this.updateConfig();
        await bridge.send("VKWebAppInit", {});
        this.urlParams = Object.fromEntries(
          new URLSearchParams(location.search),
        );
      } catch (ex: any) {
        console.error(ex);
      }

      watch(
        () => this.config.eruda,
        useApp().wrapLoading(() => {
          return setEruda(Boolean(this.config.eruda));
        }),
        { immediate: this.config.eruda },
      );

      watch(
        this.config,
        () => {
          return this.saveCurrentConfig();
        },
        { deep: true },
      );

      if (this.config.slides) {
        this.initSlides().then(() => delete this.config.slides);
      }
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
    async saveCurrentConfig() {
      await useVk().setVkStorageDict({
        config: this.config,
      });
    },
    async updateConfig() {
      try {
        const { config } = await useVk().getVkStorageDict<IAppConfig>([
          "config",
        ]);
        // таким нехитрым образом мы убедимся в правильности формата сохранённого конфига
        if (config && config.eruda !== undefined) {
          this.config = config;
        }
      } catch (ex) {
        console.error(ex);
      }
    },
    async initSlides() {
      const [commands, tops, events, about] = await Promise.all([
        imageUrlToBase64("/slides/commands.png"),
        imageUrlToBase64("/slides/tops.png"),
        imageUrlToBase64("/slides/events.png"),
        imageUrlToBase64("/slides/about.png"),
      ]);
      const slides: ShowSlidesSheetRequest["slides"] = [
        {
          media: {
            blob: commands,
            type: "image",
          },
          title: "Команды",
          subtitle: "Найдите справку к любой команде из чат-бота «Амадеус».",
        },
        {
          media: {
            blob: tops,
            type: "image",
          },
          title: "Топы",
          subtitle:
            "Попробуйте заявить о себе, заняв место в топе или поместите свой чат в каталог для привлечения новых участников.",
        },
        {
          media: {
            blob: events,
            type: "image",
          },
          title: "События",
          subtitle:
            "Ознакомьтесь с примерами событий чата для детальной настройки бота.",
        },
        {
          media: {
            blob: about,
            type: "image",
          },
          title: "Дополнительно",
          subtitle:
            "Остальные инструкции находятся в разделе «Справка».",
        },
      ];
      await bridge.send("VKWebAppShowSlidesSheet", {
        slides,
      });
    },
  },
});
