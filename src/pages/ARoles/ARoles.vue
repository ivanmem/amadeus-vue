<script lang="ts" setup>
import AButton from "../../components/AButton/AButton.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";

useAppCaption("О ролях");

const roles: {
  smile: string;
  level: number;
  caption: string;
  emoji: string;
}[] = [
  { smile: "➖", level: -1, caption: "Бесправный", emoji: "e29e96" },
  { smile: "🔹", level: 0, caption: "Прохожий", emoji: "f09f94b9" },
  { smile: "🐣", level: 1, caption: "Младший участник", emoji: "f09f90a3" },
  { smile: "🐥", level: 2, caption: "Участник", emoji: "f09f90a5" },
  { smile: "🐤", level: 3, caption: "Старший участник", emoji: "f09f90a4" },
  { smile: "🐔", level: 4, caption: "Помощник модератора", emoji: "f09f9094" },
  {
    smile: "🕵&zwj;",
    level: 5,
    caption: "Модератор",
    emoji: "f09f95b5e2808de29982",
  },
  { smile: "👮", level: 6, caption: "Старший модератор", emoji: "f09f91ae" },
  {
    smile: "💂",
    level: 7,
    caption: "Помощник администратора",
    emoji: "f09f9282",
  },
  { smile: "👳&zwj;", level: 8, caption: "Администратор", emoji: "f09f91b3" },
  {
    smile: "👳👲",
    level: 9,
    caption: "Старший администратор",
    emoji: "f09f91b2",
  },
  { smile: "🤴", level: 10, caption: "Помощник создателя", emoji: "f09fa4b4" },
  { smile: "👑", level: 11, caption: "Создатель", emoji: "f09f9191" },
];
</script>

<template>
  <APageContainer class="a-roles">
    <h4>В Амадеусе используется 11ти уровневая ролевая система.</h4>
    <div v-for="role of roles" :key="role.level" class="a-roles__level">
      <img
        :alt="role.level.toString()"
        :src="`https://vk.com/emoji/e/${role.emoji}.png`"
      />
      <span>{{ `${role.caption} (${role.level} лвл)` }}</span>
    </div>
    <p>
      Смайлы или названия ролей в вашем чате могут быть другие. Посмотреть
      текущие смайлы можно через команду
      <AButton class="a-button__inline" to="/command/106"> Смайлы</AButton>
      . А названия через:
      <AButton class="a-button__inline" to="/command/144">
        НазванияРолей
      </AButton>
      .
    </p>
  </APageContainer>
</template>

<style lang="scss">
.a-roles {
  .a-roles__level {
    align-items: center;
    column-gap: 5px;
    display: flex;
  }
}
</style>
