<script lang="ts" setup>
import linkifyHtml from "linkify-html";
import { computed } from "vue";
import { LinkifyHtmlOptions } from "../../types/linkifyHtml";

const props = defineProps<{ value?: string; tag?: string }>();
const options: LinkifyHtmlOptions = {
  defaultProtocol: "https",
  target: "_blank",
};
const html = computed(() => linkifyHtml(props.value ?? "", options));
</script>
<template>
  <component :is="tag ?? 'span'" v-html="html" />
</template>
