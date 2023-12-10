<script lang="ts" setup>
import FixedTeleport from "../FixedTeleport.vue";
import { VueElement } from "vue";
import { icons } from "../../common/consts";
import { RouteLocationRaw } from "vue-router";
import { useAppCaption } from "../../hooks/useAppCaption";

const props = defineProps<{
  icon: VueElement | keyof typeof icons;
  iconProps?: any;
  to: RouteLocationRaw;
}>();
useAppCaption("");
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
            :to="to"
            class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-amber-200"
          >
            <component
              :is="
                typeof props.icon === 'string'
                  ? icons[props.icon] ?? props.icon
                  : props.icon
              "
              height="20"
              width="20"
              v-bind="iconProps"
            />
          </RouterLink>
        </li>
        <slot />
      </ol>
    </nav>
  </FixedTeleport>
</template>
<style lang="scss"></style>
