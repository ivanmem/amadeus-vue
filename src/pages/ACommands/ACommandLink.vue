<script lang="ts" setup>
import { Command } from "../../store/commands/types";
import { useCommands } from "../../store/commands/commands";
import AButton from "../../components/AButton/AButton.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
  command: Command;
}>();
const store = useCommands();
const router = useRouter();
</script>

<template>
  <AButton
    class="a-command-link"
    @click="router.push('/command/' + props.command.id)"
  >
    <b>{{ store.getCommandFullName(props.command.id) }}</b>
    <span class="a-command-link__help">{{ props.command.helpExtended }}</span>
  </AButton>
</template>

<style lang="scss">
.a-command-link {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  padding: 8px var(--vkui--size_base_padding_horizontal--regular);
  font-family: var(--vkui--font_family_base);
  color: var(--vkui--color_text_primary);
  background: none;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  align-content: flex-start;
}

.a-command-link__help {
  font-size: var(--vkui--font_subhead--font_size--compact, 13px);
  flex-grow: 1;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: var(--vkui--font_subhead--line_height--compact, 16px);
  font-weight: var(--vkui--font_subhead--font_weight--regular, 400);
  font-family: var(--vkui--font_title1--font_family--regular);
}
</style>
