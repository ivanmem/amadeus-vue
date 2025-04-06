<script lang="ts" setup>
import { Icon24CupOutline } from "vue-vkontakte-icons";
import ABreadcrumbs from "../../components/ABreadcrumbs/ABreadcrumbs.vue";
import ABreadcrumbItem from "../../components/ABreadcrumbs/ABreadcrumbItem.vue";

const props = defineProps<{ caption: string }>();
</script>
<template>
  <ABreadcrumbs :icon="Icon24CupOutline" to="/top">
    <ABreadcrumbItem>
      {{ caption }}
    </ABreadcrumbItem>
  </ABreadcrumbs>
</template>
