<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { computed, useSlots } from "vue";

const props = defineProps({
  modelValue: [Boolean],
});

const emit = defineEmits<{
  "update:modelValue": [boolean | undefined];
}>();

function closeModal() {
  emit("update:modelValue", false);
}

function openModal() {
  emit("update:modelValue", true);
}

const slots = useSlots();

defineSlots<{
  button?: any;
  header?: any;
  content?: any;
  footer?: any;
}>();

const hasHeader = computed<boolean>(() => !!slots.header);
const hasContent = computed<boolean>(() => !!slots.content);
const hasFooter = computed<boolean>(() => !!slots.footer);
</script>

<template>
  <slot name="button" />
  <TransitionRoot :show="modelValue" appear as="template">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#ffffff] dark:bg-[#292929] p-3 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                v-if="hasHeader"
                as="h3"
                class="a-modal-header text-lg font-medium leading-6"
              >
                <slot name="header" />
              </DialogTitle>
              <div v-if="hasContent" class="a-modal-content mt-2">
                <slot name="content" />
              </div>

              <div v-if="hasFooter" class="a-modal-footer mt-4">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
