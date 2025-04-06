<script lang="ts" setup>
import { useVModel } from "@vueuse/core";
import { computed } from "vue";
import { Icon16Cancel, Icon16SearchOutline } from "vue-vkontakte-icons";

const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:model-value": [string] }>();

const search = useVModel(props, "modelValue", emit);

const IconSearch = computed(() =>
  search.value.length ? Icon16Cancel : Icon16SearchOutline,
);
</script>
<template>
  <label class="a-command-search__label">
    <IconSearch
      style="margin-right: 5px; cursor: pointer"
      @click="emit('update:model-value', '')"
    />
    <input ref="reference" v-model="search" placeholder="Поиск" />
  </label>
</template>
<style lang="scss">
.a-command-search__label {
  align-items: center;
  display: flex;
  flex-grow: 1;
  height: 36px;
  padding-inline: var(--page-padding-inline);

  input {
    background-color: initial;
    border: 0;
    border-radius: var(--vkui--size_border_radius--regular, 8px);
    color: var(--text_primary);
    flex-grow: 1;
    line-height: 100%;
    margin: 0;
    -webkit-transition:
      background-color 0.05s,
      color 0.05s;
    transition:
      background-color 0.05s,
      color 0.05s;

    &:focus-visible {
      outline: none;
    }
  }
}
</style>
