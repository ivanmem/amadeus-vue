<script lang="ts" setup>
import FixedTeleport from "../../components/FixedTeleport.vue";
import { Command } from "../../store/commands/types";
import { icons } from "../../common/consts";

const props = defineProps<{
  command?: Command;
  parentCommand?: Command;
  nameCommand: string;
}>();
const { Icon24ArticleBoxOutline } = icons;
</script>
<template>
  <FixedTeleport mounted to="#navigation-caption">
    <nav
      aria-label="Breadcrumb"
      class="a-command-breadcrumbs flex px-1 mr-1 mb-1 rounded-lg"
    >
      <ol class="inline-flex items-center space-x-1">
        <li class="inline-flex items-center">
          <RouterLink
            class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-amber-200"
            to="/"
          >
            <Icon24ArticleBoxOutline height="20" width="20" />
          </RouterLink>
        </li>
        <li>
          <div class="flex items-center pr-0.5">
            <svg
              aria-hidden="true"
              class="w-3 h-3 mx-1"
              fill="none"
              viewBox="0 0 6 10"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m1 9 4-4-4-4"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
              />
            </svg>

            <span class="ml-1 text-xs font-medium md:ml-2">
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
            </span>
          </div>
        </li>
      </ol>
    </nav>
  </FixedTeleport>
</template>
<style lang="scss">
.a-command-breadcrumbs {
  background-color: var(--navigation-background-color);
  max-height: var(--navigation-header-height);
  min-height: var(--navigation-header-height);
}
</style>
