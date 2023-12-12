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
    <nav aria-label="Breadcrumb" class="a-breadcrumbs flex rounded-lg">
      <ol>
        <li>
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
              v-bind="iconProps"
              width="20"
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
  min-height: var(--navigation-header-height);
  padding-inline: 5px;

  ol,
  li {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    margin: 0;
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
