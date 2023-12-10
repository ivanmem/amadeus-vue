<script lang="ts" setup>
import { icons } from "../../common/consts";
import ABreadcrumbs from "../../components/ABreadcrumbs/ABreadcrumbs.vue";
import ABreadcrumbItem from "../../components/ABreadcrumbs/ABreadcrumbItem.vue";

const props = defineProps<{ caption: string }>();
const { Icon24CupOutline } = icons;
</script>
<template>
  <ABreadcrumbs :icon="Icon24CupOutline" to="/top">
    <ABreadcrumbItem>
      {{ caption }}
    </ABreadcrumbItem>
  </ABreadcrumbs>
</template>
