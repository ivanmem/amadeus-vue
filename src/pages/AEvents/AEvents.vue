<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import { useCommands } from "../../store/commands/commands";
import { computed } from "vue";
import ALinkify from "../../components/ALinkify/ALinkify.vue";
import copy from "copy-to-clipboard";
import ACopyButton from "../../components/ACopyButton/ACopyButton.vue";
import AButton from "../../components/AButton/AButton.vue";

useAppCaption("События чата");
const events = computed(() => useCommands().docs?.events);

const fontSize = 14;
</script>

<template>
  <APageContainer class="a-events" v-if="events">
    <AButton
      data-type="accent"
      icon="Icon16Link"
      to="https://vk.com/@animecm-template-events"
    >
      Примеры событий
    </AButton>
    <h1>Шаблонные аргументы для команд</h1>
    <div
      class="a-event-block"
      v-for="(value, key) of events.templateArgumentsDescription"
    >
      <ACopyButton
        :size="fontSize"
        @click="copy(`%${events.templateArguments[key]}%`)"
      >
        <b>{{ `%${events.templateArguments[key]}%` }}</b>
      </ACopyButton>
      <pre style="white-space: pre-line">
        {{ value }}
      </pre>
    </div>
    <h1>Существующие типы событий:</h1>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div v-for="option of events.options">
        <div class="a-event-block">
          <div>
            <ACopyButton :size="fontSize" @click="copy(option.alias[0])">
              <b>Название:</b>&nbsp;
            </ACopyButton>
            <pre>{{ option.alias.join(", ") }}</pre>
          </div>
          <div>
            <b>Описание:</b>&nbsp;
            <ALinkify
              tag="pre"
              style="white-space: pre-line"
              :value="option.description"
            />
          </div>
          <div v-if="option.example">
            <ACopyButton :size="fontSize" @click="copy(option.example)">
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
      </div>
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
  background: var(--vkui--color_background);
  color: var(--vkui--color--text_primary);
  border-radius: var(--vkui--size_border_radius_paper--regular, 12px);
  border-block: 0.5px solid var(--vkui--color_text_tertiary);
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: v-bind("fontSize + 'px'");

  .a-copy-button {
    font-size: inherit;
  }
}
</style>
