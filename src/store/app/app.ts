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
import { router } from "../../router";
import { FiltersType, useCommands } from "../commands/commands";

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
      const commandsStore = useCommands();
      const vkStore = useVk();
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
        const { filters, config, favorite } = await vkStore.getVkStorageDict({
          filters: {} as FiltersType,
          config: {} as IAppConfig,
          favorite: [] as number[],
        });
        await appStore.updateConfig(config);
        await commandsStore.updateFilters(filters);
        await commandsStore.updateFavorite(favorite);
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
        () => this.config,
        () => {
          return this.saveCurrentConfig();
        },
        { deep: true },
      );

      watch(
        () => commandsStore.filters,
        () => {
          return commandsStore.saveCurrentFilters();
        },
        { deep: true },
      );

      watch(
        () => commandsStore.favorite,
        () => {
          return commandsStore.saveCurrentFavorite();
        },
        { deep: true },
      );

      if (this.config.slides) {
        const { action } = await this.initSlides();
        if (action === "confirm") {
          delete this.config.slides;
          await router.push("/about/");
        }
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
    saveCurrentConfig() {
      return useVk().setVkStorageDict({
        config: this.config,
      });
    },
    async updateConfig(config?: IAppConfig) {
      try {
        config ??= await useVk().getVkStorageObject<IAppConfig>("config");
        // таким нехитрым образом мы убедимся в правильности формата сохранённого конфига
        if (config && config.eruda !== undefined) {
          this.config = config;
        }
      } catch (ex) {
        console.error(ex);
      }
    },
    async initSlides() {
      const [commands, tops, about, amadeus] = await Promise.all([
        imageUrlToBase64("/slides/commands.png"),
        imageUrlToBase64("/slides/tops.png"),
        imageUrlToBase64("/slides/about.png"),
        imageUrlToBase64("/slides/amadeus.png"),
      ]);
      const slides: ShowSlidesSheetRequest["slides"] = [
        {
          media: {
            blob: amadeus,
            type: "image",
          },
          title: "Чат-бот «Амадеус»",
          subtitle:
            "Создан специально для поклонников аниме. У него около 300 команд!",
        },
        {
          media: {
            blob: commands,
            type: "image",
          },
          title: "Функционал",
          subtitle:
            "Забанить, удалить сообщение или налить чаю? Найдите в поиске то, что Вам нужно.",
        },
        {
          media: {
            blob: tops,
            type: "image",
          },
          title: "Ищите друзей-анимешников",
          subtitle:
            "Попробуйте занять место в топе или поместите свой чат в каталог.",
        },
        {
          media: {
            blob: about,
            type: "image",
          },
          title: "Как им пользоваться?",
          subtitle:
            "Инструкции по добавлению бота в чат и настройке находятся в разделе «Справка».",
        },
      ];
      return await bridge.send("VKWebAppShowSlidesSheet", {
        slides,
      });
    },
  },
});
