<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { icons } from "../../common/consts";

const props = defineProps({
  defaultOpen: { type: Boolean, default: true },
});

const { Icon24ChevronDown, Icon24ChevronUp } = icons;
</script>
<template>
  <section>
    <Disclosure :default-open="defaultOpen" v-slot="{ open }">
      <DisclosureButton>
        <header>
          <slot name="label" />
          <div class="flex items-center">
            <slot name="label-right" />
            <component
              :is="open ? Icon24ChevronUp : Icon24ChevronDown"
              :style="{ width: '20px', height: '20px' }"
            />
          </div>
        </header>
      </DisclosureButton>
      <DisclosurePanel class="!p-0">
        <slot />
      </DisclosurePanel>
    </Disclosure>
  </section>
</template>
