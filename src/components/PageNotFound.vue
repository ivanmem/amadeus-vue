<script lang="ts" setup>
import { useAppCaption } from "../hooks/useAppCaption";
import APageContainer from "./APageContainer/APageContainer.vue";
import AButton from "./AButton/AButton.vue";

useAppCaption("Ошибка");
</script>
<template>
  <APageContainer>
    <div>Данной страницы не существует или она была удалена.</div>
    <AButton to="/command/">Перейти к командам</AButton>
  </APageContainer>
</template>
