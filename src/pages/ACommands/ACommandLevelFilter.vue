<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useCommands } from "../../store/commands/commands";
import ACaption from "../../components/ACaption.vue";
import CommandHelper from "../../helpers/CommandHelper";
import ASlider from "../../components/ASlider.vue";

const commandsStore = useCommands();
const value = ref(commandsStore.filterLevels);
const valueDesc = computed(() =>
  value.value.map((x) => CommandHelper.getLevelText(x)),
);

watch(value, () => {
  commandsStore.setFilterLevels(value.value);
});
</script>

<template>
  <ACaption> Роль (от и до)</ACaption>
  <div class="a-command-level-filter">
    <ASlider v-model="value" :max="11" :min="0" />
    <div class="a-command-level-filter__description">
      <div v-for="desc of valueDesc" :key="desc">{{ desc }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.a-command-level-filter {
  @apply flex flex-col mt-8 mx-3;
}

.a-command-level-filter__description {
  @apply flex justify-between gap-3 mt-3 text-xs select-none;
}
</style>
