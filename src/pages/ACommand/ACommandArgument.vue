<script lang="ts" setup>
import { Argument } from "../../store/commands/types";
import CommandHelper from "../../helpers/CommandHelper";

const props = defineProps<{
  index: number;
  argument: Argument;
}>();
</script>
<template>
  <div class="a-border-separator">
    <div class="a-command-argument">
      <div>
        <span>
          <span
            :style="argument.indexNotImportant ? { opacity: 0.5 } : {}"
            :title="
              argument.indexNotImportant
                ? '↑↓ Может быть написан в любом порядке'
                : undefined
            "
          >
            {{ index + 1 }}
          </span>
          <span>. </span>
        </span>
        <span v-if="argument.description">{{
          argument.description || "[без описания]"
        }}</span>
        <span v-else style="opacity: 0.5" title="Описание отсутствует">
          ¯\_(ツ)_/¯
        </span>
      </div>
      <div
        v-if="argument.type"
        title="Тип аргумента"
        class="a-command-argument__type"
        :data-type="CommandHelper.getArgumentType(argument.type)"
      >
        <!--        <span><b>{{ CommandHelper.getArgumentType(argument.type) }}: </b></span>-->
        <span style="opacity: 0.8">{{
          CommandHelper.getArgumentTypeDescription(argument.type)
        }}</span>
      </div>
      <div
        v-if="argument.newLine"
        class="a-command-argument__label"
        data-icon="↩"
      >
        <div>Требует отдельной строки</div>
      </div>
      <div
        v-if="argument.required"
        class="a-command-argument__label"
        data-icon="*"
      >
        <div>Обязательный аргумент</div>
      </div>
      <div
        v-if="argument.accessValues?.length ?? 0 > 0"
        class="a-command-argument__access-values"
      >
        <div>Разрешённые значения:</div>
        <div
          v-for="accessValue of argument.accessValues"
          class="a-command-argument__access-value"
        >
          {{ accessValue }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.a-command-argument {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
}

.a-command-argument__access-values {
  display: flex;
  gap: 6px;
  align-items: center;
  flex-wrap: wrap;
  margin-block: 5px;
}

.a-command-argument__access-value {
  background-color: var(--a-command-argument__access-value__background-color);
  border-radius: 5px;
  padding: 2px;
}

.a-command-argument__type {
  display: flex;
  background-color: var(--a-command-argument__type__background-color);
  color: var(--a-command-argument__type__color);
  align-items: center;
  border-radius: 3px;
  margin-block: 5px;
  font-size: 13px;
  gap: 5px;

  &:before {
    display: flex;
    padding-inline: 10px;
    min-width: 80px;
    font-weight: bold;
    font-size: 15px;
    content: attr(data-type) ":";
  }
}

.a-command-argument__label {
  display: flex;
  background-color: var(--a-command-argument__label__background-color);
  color: var(--a-command-argument__label__color);
  align-items: center;
  border-radius: 3px;
  margin-block: 5px;
  font-size: 13px;
  gap: 5px;

  &:before {
    display: flex;
    min-width: 25px;
    font-weight: bold;
    font-size: 18px;
    padding-inline: 10px;
    content: attr(data-icon);
  }
}

.root[data-dark="false"] {
  --a-command-argument__access-value__background-color: rgba(0, 117, 255, 0.1);

  --a-command-argument__label__background-color: rgb(255, 242, 214);
  --a-command-argument__label__color: rgb(44, 45, 46);

  --a-command-argument__type__background-color: #2900ff1c;
  --a-command-argument__type__color: #006274;
}

.root[data-dark="true"] {
  --a-command-argument__access-value__background-color: #082649b3;

  --a-command-argument__label__background-color: rgba(255, 242, 214, 0.07);
  --a-command-argument__label__color: rgb(204, 204, 105);

  --a-command-argument__type__background-color: #17132c;
  --a-command-argument__type__color: #00d8ff;
}
</style>
