import { defineStore } from "pinia";
import bridge from "@vkontakte/vk-bridge";
import {
  MobileUpdateConfigData,
  MVKUpdateConfigData,
  VKUpdateConfigData,
} from "@vkontakte/vk-bridge/dist/types/src/types/data";
import { chunkString } from "../../helpers/chunkString";
import { MAX_SIZE_ONE_VK_VALUE } from "../../common/consts";
import { absoluteUrl } from "../../helpers/absoluteUrl";
import { toStr } from "../../helpers/toStr";

interface VkState {
  chunksMaxCount: number;
  vkWebAppStorageSetCount: number;
  webAppConfig: Partial<
    MobileUpdateConfigData & MVKUpdateConfigData & VKUpdateConfigData
  >;
  token?: {
    access_token: string;
  };
  groupId: number;
}

export const useVk = defineStore("vk", {
  state: (): VkState => {
    return {
      chunksMaxCount: 20, // можно получить не более десяти за 1 запрос
      vkWebAppStorageSetCount: 0,
      webAppConfig: {},
      groupId: +import.meta.env.VITE_GROUP_ID,
    };
  },
  actions: {
    getChunkSplitter() {
      return "__";
    },
    getChunkKey(key: string, index: number) {
      return `${key}${this.getChunkSplitter()}${index}`;
    },
    /** @description Получить все значения по указанным ключам в виде словаря */
    async getVkStorageDict<T extends object = Record<any, any>>(keys: T) {
      const result = await this.sendVKWebAppStorageGet({
        keys: Object.keys(keys),
      });
      return result.keys.reduce((dict, { key, value }) => {
        try {
          (dict as any)[key] = value.length ? JSON.parse(value) : undefined;
        } catch {}
        return dict;
      }, {} as Partial<T>);
    },
    /** @description Сохранить каждое свойство словаря в отдельном ключе */
    async setVkStorageDict(dataDictArray: Record<string, Record<any, any>>) {
      for (const [key, value] of Object.entries(dataDictArray)) {
        await this.sendVKWebAppStorageSet({
          key,
          value: JSON.stringify(value, (_key, value) => {
            return value instanceof Set ? [...value] : value;
          }),
        });
      }
    },
    getVkStorageObject<T = any, K extends string = string>(key: K) {
      return this.getVkStorageDict({ [key]: Object as T }).then(
        (x) => x[key] as T | undefined,
      );
    },
    async getVkStorage(key: string) {
      const keys: string[] = [];
      for (let i = 0; i < this.chunksMaxCount; i++) {
        keys.push(this.getChunkKey(key, i));
      }
      const result = await this.sendVKWebAppStorageGet({ keys });
      const chunks: string[] = [];

      const chunkSplitter = this.getChunkSplitter();
      const getIndexBySplitKey = (splitKey: string) => {
        return +splitKey.substring(key.length + chunkSplitter.length);
      };

      const sortComparer = (
        x: {
          key: string;
        },
        y: {
          key: string;
        },
      ) => {
        const xIndex = getIndexBySplitKey(x.key);
        const yIndex = getIndexBySplitKey(y.key);
        return xIndex - yIndex;
      };

      for (const { value } of result.keys.sort(sortComparer)) {
        if (value === "") {
          // при встрече первого пустого - останавливаемся. Только один будет гарантированно пуст, он и последний. В остальных могут быть старые значения.
          break;
        }

        chunks.push(value);
      }

      result.keys.forEach((x) => x.value);
      const compressData = chunks.join("");
      return compressData; //await decompressStr(compressData);
    },
    async setVkStorage(key: string, value: string) {
      const chunks = chunkString(value, MAX_SIZE_ONE_VK_VALUE);
      // проходим на один больше, чтобы последний чанк был пустой
      for (let i = 0; i < chunks.length + 1; i++) {
        let chunk = chunks[i];
        const data = {
          key: this.getChunkKey(key, i),
          value: chunk ?? "",
        };
        await this.sendVKWebAppStorageSet(data);
      }
    },
    sendVKWebAppStorageSet(data: { key: string; value: string }) {
      this.vkWebAppStorageSetCount++;
      return bridge.send("VKWebAppStorageSet", data);
    },
    sendVKWebAppStorageGet(data: { keys: string[] }) {
      return bridge.send("VKWebAppStorageGet", data);
    },
    copyText(text: any) {
      return bridge.send("VKWebAppCopyText", {
        text: toStr(text),
      });
    },
    allowMessages() {
      return bridge.send("VKWebAppAllowMessagesFromGroup", {
        group_id: this.groupId,
      });
    },
    showImages(images: string[]) {
      return bridge.send("VKWebAppShowImages", {
        images: images.map((x) => (x.startsWith("/") ? absoluteUrl(x) : x)),
      });
    },
  },
});
