import { useRouteQuery } from "@vueuse/router";
import { RouteParamValueRaw, useRoute, useRouter } from "vue-router";
import { MaybeRef, MaybeRefOrGetter, nextTick, ref, Ref, watch } from "vue";
import { useActivated } from "./useActivated";

type RouteQueryValueRaw = RouteParamValueRaw | string[];

export interface ReactiveRouteOptionsWithTransform<V, R>
  extends ReactiveRouteOptions {
  /**
   * Функция преобразования данных перед возвратом
   */
  transform?: (val: V) => R;
}

export interface ReactiveRouteOptions {
  /**
   * Режим обновления route query
   *
   * @default 'replace'
   */
  mode?: MaybeRef<"replace" | "push">;

  /**
   * Экземпляр роута. Используется `useRoute()`, если он не указан.
   */
  route?: ReturnType<typeof useRoute>;

  /**
   * Экземпляр роутера. Используется `useRouter()`, если он не указан.
   */
  router?: ReturnType<typeof useRouter>;
}

export function useActivatedRouteQuery(
  name: string,
): Ref<null | string | string[]>;

export function useActivatedRouteQuery<
  T extends RouteQueryValueRaw = RouteQueryValueRaw,
  K = T,
>(
  name: string,
  defaultValue?: MaybeRefOrGetter<T>,
  options?: ReactiveRouteOptionsWithTransform<T, K>,
): Ref<K>;

/** Аналогична функции useRouteQuery, но дополнительно синхронизирует route когда компонент активен. После повторной активации компонента восстанавливает предыдущее значение в адресную строку */
export function useActivatedRouteQuery<
  T extends RouteQueryValueRaw = RouteQueryValueRaw,
  K = T,
>(
  name: string,
  defaultValue?: MaybeRefOrGetter<T>,
  options: ReactiveRouteOptionsWithTransform<T, K> = {},
): Ref<K> {
  const activated = useActivated();
  const queryValue = useRouteQuery<T, K>(name, defaultValue, options);
  const value = ref(queryValue.value) as any as Ref<K>;
  const route = options.route ?? useRoute();
  const router = options.router ?? useRouter();

  watch(activated, () => {
    if (activated.value) {
      queryValue.value = value.value;
    }
  });

  watch(
    queryValue,
    async () => {
      await nextTick();
      if (activated.value) {
        value.value = queryValue.value;
      }
    }
  );

  // обновляем url при изменении значения (почему-то useRouteQuery этого сам не делает)
  watch(value, () => {
    if (!activated.value) {
      return;
    }

    return router.replace({
      ...route,
      query: { ...route.query, search: value.value as any },
    });
  });

  return value;
}
