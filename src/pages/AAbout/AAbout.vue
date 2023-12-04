<script lang="ts" setup>
import AButton from "../../components/AButton/AButton.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import { useApp } from "../../store/app/app";
import AToggle from "../../components/AToggle/AToggle.vue";

useAppCaption("Справка");

const appStore = useApp();
const userAgent = navigator.userAgent;
</script>

<template>
  <APageContainer class="a-about">
    <span>
      Это приложение с открытым исходным кодом.
      <br />Вы можете внести свой вклад. <br />Для этого вам необходимо изучить:
      <b>TypeScript, Vite, Vue 3, Pinia, SCSS, Tailwind</b>.
    </span>

    <div class="flex flex-wrap gap-2">
      <AButton to="https://vk.com/@animecm-install" icon="Icon24Add"
        >Инструкция по подключению бота</AButton
      >
      <AButton
        to="https://vk.com/@animecm-articles"
        icon="Icon24ArticleBoxOutline"
        >Оглавление</AButton
      >
      <AButton
        class="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2"
        style="height: 36px"
        to="https://github.com/ivanmem/amadeus-vue"
        type="button"
      >
        <svg
          aria-hidden="true"
          class="w-4 h-4 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
            fill-rule="evenodd"
          />
        </svg>
        Github
      </AButton>
      <AToggle v-model="appStore.config.eruda">Eruda</AToggle>
    </div>
    <template v-if="appStore.config.eruda">
      <span>
        Ваша платформа: <b>{{ appStore.platform }}</b>
      </span>
      <div class="overflow-block">
        <b>webAppConfig:</b>
        <pre>{{ appStore.webAppConfig }}</pre>
        <b>urlParams:</b>
        <pre>{{ appStore.urlParams }}</pre>
        <b>userAgent:</b>
        <pre>{{ userAgent }}</pre>
      </div>
    </template>
  </APageContainer>
</template>
<style lang="scss">
.a-about {
  background-image:
    linear-gradient
      (
        var(--vkui--color_background_content),
        transparent,
        var(--vkui--color_background_content)
      ),
    url(/src/assets/amadeus1.webp);
  background-position: right;
  background-repeat: repeat, no-repeat;
  background-size: auto, contain;
  gap: 20px;

  pre {
    flex: 1;
    margin: 0;
    min-width: 0;
    overflow: visible;
    white-space: pre-wrap;
  }
}
</style>
