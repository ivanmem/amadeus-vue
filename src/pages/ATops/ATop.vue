<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import AButton from "../../components/AButton/AButton.vue";
import { icons } from "../../common/consts";

useAppCaption("Топы");
const { Icon24CupOutline } = icons;
</script>
<template>
  <APageContainer class="a-tops">
    <span class="top-header"> <Icon24CupOutline /> Чаты </span>
    <div class="flex gap-3 flex-wrap">
      <AButton
        icon="Icon28ChatsOutline"
        icon-style="width: 24px; height: 24px;"
        to="/top/conversations"
      >
        Общий
      </AButton>
      <AButton
        icon="Icon28ChatsOutline"
        icon-style="width: 24px; height: 24px;"
        to="/top/conversations/today"
      >
        Сегодня
      </AButton>
      <AButton icon="Icon24Chats" to="/top/conversations/catalog">
        Каталог
      </AButton>
    </div>
    <br />
    <span class="top-header"> <Icon24CupOutline /> Пользователи </span>
    <div class="flex gap-3 flex-wrap">
      <AButton icon="Icon24Users3Outline" to="/top/users"> Общий</AButton>
      <AButton icon="Icon24Users3Outline" to="/top/users/today">
        Сегодня
      </AButton>
    </div>
    <br />
    <span class="top-header"> <Icon24CupOutline /> Команды </span>
    <div class="flex gap-3 flex-wrap">
      <AButton icon="Icon24Squareshape4HorizontalOutline" to="/top/commands">
        Общий
      </AButton>
    </div>
  </APageContainer>
</template>
<style lang="scss">
.a-tops {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .top-header {
    display: inline-flex;
    gap: 4px;
    margin-left: 4px;
  }
}
</style>
