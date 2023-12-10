<script lang="ts" setup>
import ABreadcrumbDelimiter from "./ABreadcrumbDelimiter.vue";
</script>
<template>
  <ABreadcrumbDelimiter />
  <li>
    <span class="text-xs font-medium md-2">
      <slot />
    </span>
  </li>
</template>
