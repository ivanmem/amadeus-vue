<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import { useAppCaption } from "../../hooks/useAppCaption";
import { useCommands } from "../../store/commands/commands";
import { computed } from "vue";

useAppCaption("События чата");
const events = computed(() => useCommands().docs.events);
</script>

<template>
  <APageContainer class="a-events">
    <h1>Шаблонные аргументы для команд</h1>
    <div class="a-event-block">
      <div v-for="(value, key) of events.templateArgumentsDescription">
        <b>%{{ events.templateArguments[key] }}%</b>
        <div>
          {{ value }}
        </div>
      </div>
    </div>
    <h1>Существующие типы событий:</h1>
    <div style="display: flex; flex-direction: column; gap: 10px">
      <div v-for="option of events.options">
        <h3>➤ {{ option.alias.join(", ") }}</h3>
        <div class="a-event-block">
          <div><b>Описание:</b> {{ option.description }}</div>
          <div>
            <b>Пример:</b>
            <pre>{{ option.example }}</pre>
          </div>
          <div>
            <b>Требуется значение:</b> {{ option.requiredValue ? "Да" : "Нет" }}
          </div>
          <div v-if="option.max != 0">
            <b>Максимальное количество событий с этим типом:</b>
            {{ option.max }}
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
}
</style>
