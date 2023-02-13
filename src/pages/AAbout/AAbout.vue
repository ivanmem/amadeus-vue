<script lang="ts" setup>
import AButton from "../../components/AButton/AButton.vue";
import APageContainer from "../../components/APageContainer/APageContainer.vue";
</script>

<template>
  <APageContainer>
    <h4>
      Это приложение с открытым исходным кодом. Вы можете внести свой вклад.
    </h4>
    <AButton
      class="a-button__center a-icon pointer"
      icon="Icon16Link"
      to="https://github.com/xeleoss/amadeus-vue"
    >
      <span>Github</span>
    </AButton>
  </APageContainer>
</template>
