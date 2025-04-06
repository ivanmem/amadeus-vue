<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import { useCommands } from "../../store/commands/commands";
import { computed } from "vue";
import ALinkify from "../../components/ALinkify/ALinkify.vue";
import ACopyButton from "../../components/ACopyButton/ACopyButton.vue";
import AButton from "../../components/AButton/AButton.vue";
import { useVk } from "../../store/vk/vk";
import { Icon16Link } from "vue-vkontakte-icons";

useAppCaption("События чата");
const vkService = useVk();
const events = computed(() => useCommands().docs?.events);

const fontSize = 14;
</script>

<template>
  <APageContainer v-if="events" class="a-events">
    <AButton
      class="self-start"
      data-type="accent"
      :icon="Icon16Link"
      to="https://vk.com/@animecm-template-events"
    >
      Примеры событий
    </AButton>
    <h1>Шаблонные аргументы для команд</h1>
    <div
      v-for="(value, key) of events.templateArgumentsDescription"
      class="a-event-block"
    >
      <ACopyButton
        :size="fontSize"
        @click="vkService.copyText(`%${events.templateArguments[key]}%`)"
      >
        <b>{{ `%${events.templateArguments[key]}%` }}</b>
      </ACopyButton>
      <pre class="whitespace-pre-line">
        {{ value }}
      </pre>
    </div>
    <h1>Существующие типы событий:</h1>
    <div class="flex flex-col gap-3 items-start">
      <template v-for="option of events.options">
        <div class="a-event-block">
          <div class="max-w-full overflow-auto">
            <ACopyButton
              :size="fontSize"
              @click="vkService.copyText(option.alias[0])"
            >
              <b>Название:</b>&nbsp;
            </ACopyButton>
            <pre class="break-words whitespace-pre-wrap">{{
              option.alias.join(", ")
            }}</pre>
          </div>
          <div>
            <b>Описание:</b>&nbsp;
            <ALinkify
              :value="option.description"
              class="whitespace-pre-line"
              tag="pre"
            />
          </div>
          <div v-if="option.example" class="max-w-full overflow-auto">
            <ACopyButton
              :size="fontSize"
              @click="vkService.copyText(option.example)"
            >
              <b>Пример:</b>
            </ACopyButton>
            <pre>{{ option.example }}</pre>
          </div>
          <div v-if="option.requiredValue">
            <b>Требует указания значения!</b>
          </div>
          <div v-if="option.max != 0 && option.max !== undefined">
            <b>Максимум событий:</b>
            {{ option.max ?? "♾️" }}
          </div>
        </div>
      </template>
    </div>
  </APageContainer>
</template>
<style lang="scss">
.a-events {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.a-event-block {
  align-items: flex-start;
  align-self: stretch;
  background: var(--vkui--color_background);
  border-block: 0.5px solid var(--vkui--color_text_tertiary);
  border-radius: var(--vkui--size_border_radius_paper--regular, 12px);
  color: var(--vkui--color--text_primary);
  display: flex;
  flex-direction: column;
  font-size: v-bind("fontSize + 'px'");
  gap: 5px;
  padding: 10px;

  .a-copy-button {
    font-size: inherit;
  }
}
</style>
