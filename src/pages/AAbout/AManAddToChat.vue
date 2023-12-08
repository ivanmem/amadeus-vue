<script lang="ts" setup>
import AButton from "../../components/AButton/AButton.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import { useApp } from "../../store/app/app";
import { useVk } from "../../store/vk/vk";
import FixedTeleport from "../../components/FixedTeleport.vue";
import { icons } from "../../common/consts";

useAppCaption("");

const appStore = useApp();
const vkService = useVk();
const { Icon24LightbulbStarOutline } = icons;
</script>

<template>
  <FixedTeleport mounted to="#navigation-caption">
    <nav
      aria-label="Breadcrumb"
      class="a-command-breadcrumbs flex px-1 mr-1 mb-1 rounded-lg"
    >
      <ol class="inline-flex items-center space-x-1">
        <li class="inline-flex items-center">
          <RouterLink
            class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-amber-200"
            to="/"
          >
            <Icon24LightbulbStarOutline height="20" width="20" />
          </RouterLink>
        </li>
        <li>
          <div class="flex items-center pr-0.5">
            <svg
              aria-hidden="true"
              class="w-3 h-3 mx-1"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 9 4-4-4-4"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span class="ml-1 text-xs font-medium md:ml-2">
              Добавление бота в чат
            </span>
          </div>
        </li>
      </ol>
    </nav>
  </FixedTeleport>
  <APageContainer class="a-man-add-to-chat">
    <span>
      1. Зайдите в список участников чата и убедитесь, что Вам доступна кнопка
      «Назначить администратора» на любом из участников. Если у Вас кнопки нет -
      только создатель чата сможет добавить бота.
    </span>
    <AButton
      icon="Icon24Picture"
      @click="vkService.showImages(['/slides/add-administrator.jpg'])"
    >
      Назначение администратора
    </AButton>
    <br />
    <span>
      2. Пригласите бота в чат с помощью кнопки ниже. Внимание, не давайте ему
      права на чтение!
    </span>
    <AButton icon="Icon24Add" to="https://vk.com/app6441755_-178374368">
      Пригласить в чат
    </AButton>
    <br />
    <span>
      3. Зайдите в список участников чата, найдите среди них Амадеуса и дайте
      ему права администратора с помощью кнопки «Назначить администратора».
    </span>
    <br />
    <span>
      4. Если Вы пригласили бота в чат сообщества, то потребуется написать
      команду «!задатьСоздателя», чтобы получить права создателя. Если до Вас
      кто-то написал эту команду и забрал создателя себе — исключите его из чата
      и бот передаст права Вам.
    </span>
    <br />
    <span>
      5. На этом всё! Бот уже должен работать. Попробуйте написать в чате: !роль
    </span>
    <span>
      Так же советуем ознакомиться со статьёй «Оглавление». Но если всё равно
      возникнут вопросы - присоединяйтесь к нам в чат. Мы поможем.
    </span>
    <div class="flex flex-wrap gap-3">
      <AButton
        icon="Icon24BookSpreadOutline"
        to="https://vk.com/@animecm-articles"
      >
        Оглавление
      </AButton>
      <AButton
        icon="Icon24Chats"
        to="https://vk.me/join/PE73yGJH2zM8cfMRom7ASQjmbgaqHWw_Ivo="
      >
        Официальная беседа Амадеус
      </AButton>
    </div>
  </APageContainer>
</template>
<style lang="scss">
.a-man-add-to-chat {
}
</style>
