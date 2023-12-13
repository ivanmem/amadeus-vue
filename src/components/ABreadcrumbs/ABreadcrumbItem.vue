<script lang="ts" setup>
import ABreadcrumbDelimiter from "./ABreadcrumbDelimiter.vue";
import ASingleLineDynamicFont from "../ASingleLineDynamicFont.vue";
</script>
<template>
  <ABreadcrumbDelimiter />
  <li>
    <ASingleLineDynamicFont>
      <slot />
    </ASingleLineDynamicFont>
  </li>
</template>
