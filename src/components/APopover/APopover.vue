<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
</script>
<template>
  <Popover v-slot="{ open }" class="relative">
    <PopoverButton :class="open ? '' : 'text-opacity-90'">
      <slot name="button" />
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute ml-auto left-0 right-0 z-10 w-max max-w-screen max-w-sm transform px-4 sm:px-0"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"
        >
          <div
            class="px-2 py-2 bg-gray-50 dark:bg-gray-900 p-4 text-sm font-medium"
          >
            <slot />
          </div>
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>
