<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import AButton from "../../components/AButton/AButton.vue";

useAppCaption("Топы");
</script>
<template>
  <APageContainer class="a-tops">
    <div class="a-button__left-content-block">
      <AButton
        class="a-button__left-content"
        icon="Icon28ChatsOutline"
        icon-style="width: 24px; height: 24px;"
        to="/top/conversations/today"
      >
        Топ чатов (за сегодня)
      </AButton>
      <AButton
        class="a-button__left-content"
        icon="Icon28ChatsOutline"
        icon-style="width: 24px; height: 24px;"
        to="/top/conversations"
      >
        Топ чатов (за всё время)
      </AButton>
      <AButton
        class="a-button__left-content"
        icon="Icon24Chats"
        to="/top/conversations/catalog"
      >
        Каталог чатов
      </AButton>
      <AButton
        class="a-button__left-content"
        icon="Icon24Users3Outline"
        to="/top/users/today"
      >
        Топ пользователей за сегодня
      </AButton>
      <AButton
        class="a-button__left-content"
        icon="Icon24Users3Outline"
        to="/top/users"
      >
        Топ пользователей за всё время
      </AButton>
      <AButton
        class="a-button__left-content"
        icon="Icon24View"
        to="/top/commands"
      >
        Топ команд (за всё время)
      </AButton>
    </div>
  </APageContainer>
</template>
<style lang="scss">
.a-tops {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
