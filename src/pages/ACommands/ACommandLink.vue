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
    class="a-command-link a-button__block group"
    icon="Icon16Dash"
    icon-class="group-hover:animate-spin"
    @click="router.push('/command/' + props.command.id)"
  >
    <div class="a-command-link__content">
      <div class="a-command-link__name">
        {{ store.getCommandFullName(props.command.id) }}
      </div>
      <div class="a-command-link__help">{{ props.command.helpExtended }}</div>
    </div>
  </AButton>
</template>

<style lang="scss">
.a-command-link {
  display: flex;
  flex-direction: row;
  text-decoration: none;
  padding: 0 12px;
  font-family: var(--vkui--font_family_base);
  background: none;
  border: none;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  border-radius: 0;

  &:nth-child(2n + 1) {
    color: var(--nth-child-1-color);
  }

  &:nth-child(2n) {
    color: var(--nth-child-2-color);
  }

  svg {
    min-width: 16px;
    min-height: 16px;
  }
}

.a-command-link__content {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: var(--vkui--color_text_primary);
}

.a-command-link__name {
  font-size: 14px;
  text-transform: uppercase;
}

.a-command-link__help {
  font-size: 12px;
  flex-grow: 1;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: var(--vkui--font_subhead--line_height--compact, 16px);
  font-weight: var(--vkui--font_subhead--font_weight--regular, 400);
  font-family: var(--vkui--font_title1--font_family--regular);
  opacity: 0.8;
}
</style>
