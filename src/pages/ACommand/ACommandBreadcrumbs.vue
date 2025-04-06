<script lang="ts" setup>
import { Command } from "../../store/commands/types";
import { Icon24ArticleBoxOutline } from "vue-vkontakte-icons";
import ABreadcrumbs from "../../components/ABreadcrumbs/ABreadcrumbs.vue";
import ABreadcrumbItem from "../../components/ABreadcrumbs/ABreadcrumbItem.vue";

const props = defineProps<{
  command?: Command;
  parentCommand?: Command;
  nameCommand: string;
}>();
</script>
<template>
  <ABreadcrumbs :icon="Icon24ArticleBoxOutline" to="/">
    <ABreadcrumbItem>
      <template v-if="props.parentCommand">
        <RouterLink
          :to="`/command/${props.parentCommand.id}`"
          class="hover:text-blue-600 dark:hover:text-amber-200"
        >
          {{ props.parentCommand.alias[0] }}
        </RouterLink>
        {{ props.command?.alias[0] }}
      </template>
      <template v-else>{{ props.nameCommand }}</template>
    </ABreadcrumbItem>
  </ABreadcrumbs>
</template>
<style lang="scss"></style>
