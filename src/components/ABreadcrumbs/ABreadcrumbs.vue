<script lang="ts" setup>
import FixedTeleport from "../FixedTeleport.vue";
import { VueElement } from "vue";
import { RouteLocationRaw } from "vue-router";
import { useAppCaption } from "../../hooks/useAppCaption";

const props = defineProps<{
  icon: VueElement;
  iconProps?: any;
  to: RouteLocationRaw;
}>();
useAppCaption("");
</script>
<template>
  <FixedTeleport mounted to="#navigation-caption">
    <nav aria-label="Breadcrumb" class="a-breadcrumbs flex rounded-lg">
      <ol>
        <li>
          <RouterLink
            :to="to"
            class="inline-flex items-center text-sm font-medium hover:text-blue-600 dark:hover:text-amber-200"
          >
            <component
              :is="props.icon"
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
<style lang="scss">
.a-breadcrumbs {
  background-color: var(--navigation-background-color);
  max-height: var(--navigation-header-height);
  max-width: 100%;
  min-height: var(--navigation-header-height);
  overflow: hidden;
  padding-inline: 5px;

  ol,
  li {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    margin: 0;
    max-width: 100%;
    overflow: hidden;
    padding: 0;
  }

  li {
    column-gap: 4px;
    font-size: inherit;
    font-weight: 500;
    line-height: inherit;
    row-gap: 2px;
  }
}
</style>
