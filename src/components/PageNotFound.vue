<script lang="ts" setup>
import { useAppCaption } from "../hooks/useAppCaption";
import APageContainer from "./APageContainer/APageContainer.vue";
import AButton from "./AButton/AButton.vue";
import { Icon24Back } from "vue-vkontakte-icons";

useAppCaption("Ошибка");
</script>
<template>
  <APageContainer>
    <div>Данной страницы не существует или она была удалена.</div>
    <AButton class="self-start" :icon="Icon24Back" to="/command/"
      >Перейти к командам
    </AButton>
  </APageContainer>
</template>
