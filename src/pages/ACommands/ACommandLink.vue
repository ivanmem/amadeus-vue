<script lang="ts" setup>
import { Command } from "../../store/commands/types";
import { useCommands } from "../../store/commands/commands";
import AButton from "../../components/AButton/AButton.vue";
import { useRouter } from "vue-router";
import { ILang } from "../../types/ILang";
import { Icon16Dash } from "vue-vkontakte-icons";

const props = withDefaults(
  defineProps<{
    command: Command;
    lang?: ILang;
  }>(),
  {
    lang: "ru",
  },
);
const store = useCommands();
const router = useRouter();
</script>

<template>
  <AButton
    class="a-command-link a-button__block group"
    :icon="Icon16Dash"
    icon-class="group-hover:animate-spin"
    @click="router.push('/command/' + props.command.id)"
  >
    <div class="a-command-link__content">
      <div class="a-command-link__name">
        {{ store.getCommandFullName(props.command.id, props.lang) }}
      </div>
      <div class="a-command-link__help">{{ props.command.helpExtended }}</div>
    </div>
  </AButton>
</template>

<style lang="scss">
.a-command-link {
  align-items: center;
  background: none;
  border: none;
  border-radius: 0;
  display: flex;
  flex-direction: row;
  font-family: var(--vkui--font_family_base);
  justify-content: flex-start;
  padding: 0 8px;
  text-align: left;
  text-decoration: none;

  &:nth-child(2n + 1) {
    color: var(--nth-child-1-color);
  }

  &:nth-child(2n) {
    color: var(--nth-child-2-color);
  }

  svg {
    min-height: 16px;
    min-width: 16px;
  }
}

.a-command-link__content {
  color: var(--vkui--color_text_primary);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.a-command-link__name {
  font-size: 14px;
  text-transform: uppercase;
}

.a-command-link__help {
  flex-grow: 1;
  font-family: var(--vkui--font_title1--font_family--regular);
  font-size: 12px;
  font-weight: var(--vkui--font_subhead--font_weight--regular, 400);
  line-height: var(--vkui--font_subhead--line_height--compact, 16px);
  max-width: 100%;
  opacity: 0.8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
