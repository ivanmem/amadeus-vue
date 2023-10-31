<script lang="ts" setup>
import { useMounted } from "@vueuse/core";
import FixedTeleport from "../../components/FixedTeleport.vue";
import { Command } from "../../store/commands/types";
import { icons } from "../../common/consts";

const props = defineProps<{
  command?: Command;
  parentCommand?: Command;
  nameCommand: string;
}>();

const isMounted = useMounted();
const { Icon24ArticleBoxOutline } = icons;
</script>
<template>
  <FixedTeleport v-if="isMounted" to="#navigation-caption">
    <nav
      aria-label="Breadcrumb"
      class="flex px-1 mr-1 mb-1 text-gray-700 border border-gray-200 rounded-lg bg-gray-100 dark:bg-gray-950 dark:border-gray-700 dark:text-gray-100"
      style="height: 36px"
    >
      <ol class="inline-flex items-center space-x-1">
        <li class="inline-flex items-center">
          <a
            class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-amber-200"
            href="#"
          >
            <Icon24ArticleBoxOutline height="20" width="20" />
          </a>
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
