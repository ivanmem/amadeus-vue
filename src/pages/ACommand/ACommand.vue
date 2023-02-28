<script lang="ts" setup>
import { useCommandInfo } from "./useCommandInfo";
import { ACommandProps } from "./types";
import CommandHelper from "../../helpers/CommandHelper";
import { useRouter } from "vue-router";
import { PermissionPrivateMessagesTypeEnum, RepeatCommandConversationEnum } from "../../store/commands/types";
import AButton from "../../components/AButton/AButton.vue";
import { watch } from "vue";
import { isNullOrUndefined } from "../../helpers/isNullOrUndefined";
import { isNullOrUndefinedOrWhiteSpace } from "../../helpers/isNullOrUndefinedOrWhiteSpace";

const props = defineProps<ACommandProps>();
const router = useRouter();
const { nameCommand, command, store, relatedCommands } = useCommandInfo(props);
watch(
  () => props.id,
  () => {
    // сброс скролла при смене команды
    document.querySelector(".route-view")!.scroll(0, 0);
  }
);
</script>

<template>
  <div v-if="command" class="a-command">
    <teleport to="#navigation-header-body">
      {{ nameCommand }}
    </teleport>

    <section>
      <header>📎 Описание</header>
      <div>
        {{ command.helpExtended }}
      </div>
    </section>

    <section>
      <header>💬 Названия</header>
      <div>
        {{ command.alias.join(", ") }}
      </div>
    </section>

    <section v-if="command.argumentsListString.length">
      <header>
        <span>🔧 Аргументы</span>
        <AButton
          class="a-button__opacity zoom75"
          icon="Icon24InfoCircleOutline"
          target="_blank"
          to="https://vk.com/@animecm-arguments"
        >
          Подробнее
        </AButton>
      </header>
      <div>
        <pre>{{ command.argumentsListString }}</pre>
      </div>
    </section>

    <section>
      <header>✏ Полный пример (со всеми аргументами)</header>
      <div>
        <pre style="user-select: contain">{{ command.templateString }}</pre>
      </div>
    </section>

    <section v-if="command.templateString !== command.minTemplateString">
      <header>✏ Минимальный пример (только с обязательными аргументами)</header>
      <div>
        <pre style="user-select: contain">{{ command.minTemplateString }}</pre>
      </div>
    </section>

    <section v-if="command.templateString !== command.minTemplateString">
      <header>⚠ Требуемая роль</header>
      <div>
        {{ CommandHelper.getLevelText(command.accessLevel) }}
      </div>
    </section>

    <section v-if="command.modifiers">
      <header>⚡ Модификаторы</header>
      <div class="a-command__buttons">
        <AButton
          v-for="commandImplicitId of command.modifiers"
          :key="commandImplicitId"
          data-size="middle"
          data-type="accent"
          @click="router.push('/command/' + commandImplicitId)"
        >
          {{ store.getCommandFullName(commandImplicitId) }}
        </AButton>
      </div>
    </section>
    <section
      v-for="commandImplicit of command.commandImplicit"
      v-if="command.commandImplicit"
      :key="commandImplicit.alias[0]"
    >
      <header>⚡ Неявный модификатор</header>
      <div
        v-for="commandImplicitId of command.modifiers"
        :key="commandImplicitId"
        class="a-command"
      >
        <section>
          <header>💬 Названия</header>
          <div>
            {{ commandImplicit.alias.join(", ") }}
          </div>
        </section>

        <section>
          <header>📎 Описание</header>
          <div>
            {{ commandImplicit.helpExtended }}
          </div>
        </section>

        <section>
          <header>❓ Использование</header>
          <div>
            {{ commandImplicit.help }}
          </div>
        </section>
      </div>
    </section>

    <section v-if="relatedCommands">
      <header>🖇 Связанные команды</header>
      <div class="a-command__buttons">
        <AButton
          v-for="relatedCommandId of relatedCommands"
          :key="relatedCommandId"
          data-size="middle"
          data-type="accent"
          @click="router.push('/command/' + relatedCommandId)"
        >
          {{ store.getCommandFullName(relatedCommandId) }}
        </AButton>
      </div>
    </section>

    <section v-for="(key, keyIndex) of command.keys" :key="key.key">
      <header>
        <span>
          {{ key.header }}
          <template v-if="!isNullOrUndefined(key.accessLevel)">
            &nbsp;| ⚠ Требуемая роль:
            {{ CommandHelper.getLevelText(key.accessLevel) }}
          </template>
        </span>
        <AButton
          v-if="keyIndex === 0"
          class="a-button__opacity zoom75"
          icon="Icon24InfoCircleOutline"
          target="_blank"
          to="https://vk.com/@animecm-man?anchor=klyuchi"
        >
          Подробнее
        </AButton>
      </header>
      <div v-if="key.isDon">
        <AButton icon="Icon24DollarCircleOutline" to="/don"
        >Требуется статус дона
        </AButton>
      </div>
      <div>
        {{ key.description }}
      </div>

      <div v-if="key.params" style="font-size: 13px">
        <b class="">Аргументы:</b>
        <ol style="margin: 0">
          <li v-for="arg of key.params">
            <div v-if="!isNullOrUndefinedOrWhiteSpace(arg.description)">
              <ul style="padding: 0">
                {{
                  arg.description
                }}
              </ul>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section>
      <header>🛠 Тип</header>
      <div>
        {{ CommandHelper.getType(command.type) }}
      </div>
    </section>

    <section v-if="command.repeat === RepeatCommandConversationEnum.Yes">
      <div class="command-boolean">
        🆘 Повторяет ответ в беседе, если была успешно выполнена в личных
        сообщениях.
      </div>
    </section>

    <section v-if="CommandHelper.isAccessLs(command.privateMessages)">
      <div class="command-boolean">
        👁 Разрешена всем ролям в личных сообщениях бота
        {{
          command.privateMessages ===
          PermissionPrivateMessagesTypeEnum.YesImportant
            ? " (принудительно)"
            : ""
        }}
      </div>
    </section>

    <section v-if="command.notPrivateMessages">
      <div class="command-boolean">🚦 Можно использовать только в беседе.</div>
    </section>

    <section v-if="command.onlyPrivateMessages">
      <div class="command-boolean">
        🚦 Можно использовать только в личных сообщениях бота.
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.a-command {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;
  gap: 15px;
  background: var(--vkui--color_background_content);
  color: var(--vkui--color--text_primary);
  border-radius: var(--vkui--size_border_radius_paper--regular, 12px);

  section {
    display: flex;
    flex-direction: column;
    gap: 10px;

    header {
      display: flex;
      justify-content: space-between;
      border-block: 0.5px solid var(--vkui--color_text_tertiary);
      border-radius: 5px;
      font-weight: bold;
      font-style: italic;
    }

    div {
      padding: 5px;
      color: inherit;
    }

    pre {
      padding: 5px;
      font-family: inherit;
    }
  }

  .command-boolean {
    padding: 0;
    font-size: var(--vkui--font_headline1--font_size--compact, 15px);
    font-weight: var(--vkui--font_weight_accent3, 400);
    line-height: var(--vkui--font_headline1--line_height--compact, 20px);
  }
}

.a-command__buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
