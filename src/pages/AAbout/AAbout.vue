<script lang="ts" setup>
import AButton from "../../components/AButton/AButton.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import amadeus1Path from "../../assets/amadeus1.webp";

const backgroundImageStyle = `
background-image: linear-gradient(
  var(--vkui--color_background_content), transparent,
  var(--vkui--color_background_content)),
  url(${amadeus1Path}
);
`;
</script>

<template>
  <APageContainer :style="backgroundImageStyle" class="a-about">
    <teleport to="#navigation-header-body"> О приложении</teleport>
    <span>
      Это приложение с открытым исходным кодом.
      <br />Вы можете внести свой вклад. <br />Для этого вам необходимо изучить:
      <b>TypeScript, SCSS, Vite, Vue 3, Pinia</b>.
    </span>
    <AButton icon="Icon16Link" to="https://github.com/xeleoss/amadeus-vue">
      <span>Github</span>
    </AButton>
  </APageContainer>
</template>
<style lang="scss">
.a-about {
  background-position: right;
  background-repeat: repeat, no-repeat;
  background-size: auto, contain;
}
</style>
