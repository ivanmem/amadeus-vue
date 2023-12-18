<script lang="ts" setup>
import ATopConversationsTable from "./ATopConversationsTable.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import AButton from "../../components/AButton/AButton.vue";
import ATopError from "./ATopError.vue";
import { TopService } from "../../services/TopService";
import ATopBreadcrumbs from "./ATopBreadcrumbs.vue";

const items = await TopService.get("/top/conversations/catalog");
</script>
<template>
  <ATopBreadcrumbs caption="Каталог чатов" />
  <APageContainer style="padding-inline: 0">
    <div class="page-padding-inline">
      <details style="padding: var(--page-padding)">
        <summary style="cursor: pointer">Хотите попасть в каталог?</summary>
        <div>
          <br />
          <div>
            1) Установите ссылку на ваш чат с помощью команды:
            <AButton class="a-button__inline" to="/command/63">
              ЗадатьСсылку
            </AButton>
          </div>
          <br />
          <div>
            2) Выполните команду:
            <AButton class="a-button__inline" to="/command/70">
              ПубличнаяСсылка
            </AButton>
          </div>
          <br />
          <div>
            * Для скрытия ссылки выполните команду
            <AButton class="a-button__inline" to="/command/70">
              ПубличнаяСсылка
            </AButton>
            ещё раз.
          </div>
        </div>
      </details>
    </div>
    <ATopError v-if="typeof items === 'string'">{{ items }}</ATopError>
    <ATopConversationsTable v-else :items="items" />
  </APageContainer>
</template>
