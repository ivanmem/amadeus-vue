<script lang="ts" setup>
import { useAppCaption } from "../../hooks/useAppCaption";
import ATopConversationsTable from "./ATopConversationsTable.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import AButton from "../../components/AButton/AButton.vue";

useAppCaption("Каталог чатов");
const items: object[] = await fetch(
  "https://xeleos.ddns.net/api/top/conversations/catalog",
).then((x) => x.json());
</script>
<template>
  <APageContainer style="padding-inline: 0">
    <details style="padding: var(--page-padding)">
      <summary style="cursor: pointer">Хотите попасть в каталог?</summary>
      <ol>
        <li>
          1) Установите ссылку на ваш чат с помощью команды:
          <AButton class="a-button__inline" to="/command/63">
            ЗадатьСсылку
          </AButton>
        </li>
        <li>
          2) Выполните команду:
          <AButton class="a-button__inline" to="/command/70">
            ПубличнаяСсылка
          </AButton>
        </li>
      </ol>
      Для скрытия ссылки выполните команду
      <AButton class="a-button__inline" to="/command/70">
        ПубличнаяСсылка
      </AButton>
      ещё раз.
    </details>
    <ATopConversationsTable :items="items" />
  </APageContainer>
</template>
