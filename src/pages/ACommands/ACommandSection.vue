<script lang="ts" setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { icons } from "../../common/consts";

const props = defineProps({
  defaultOpen: { type: Boolean, default: true },
});

const { Icon24ChevronDown, Icon24ChevronUp } = icons;
</script>
<template>
  <section>
    <Disclosure v-slot="{ open }" :default-open="defaultOpen">
      <DisclosureButton v-if="$slots.label">
        <header>
          <slot name="label" />
          <div class="flex items-center gap-5">
            <slot name="label-right" />
            <component
              :is="open ? Icon24ChevronUp : Icon24ChevronDown"
              :style="{ width: '20px', height: '20px' }"
            />
          </div>
        </header>
      </DisclosureButton>
      <DisclosurePanel class="a-command__section-content">
        <slot />
      </DisclosurePanel>
    </Disclosure>
  </section>
</template>
