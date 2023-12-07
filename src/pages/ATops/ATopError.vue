<script lang="ts" setup>
import AMessage from "../../components/AMessage/AMessage.vue";
</script>
<template>
  <AMessage style="padding-inline: var(--page-padding-inline)">
    <slot />
  </AMessage>
</template>
