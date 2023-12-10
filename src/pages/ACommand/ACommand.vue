<script lang="ts" setup>
import { useCommandInfo } from "./useCommandInfo";
import { ACommandProps } from "./types";
import CommandHelper from "../../helpers/CommandHelper";
import { useRouter } from "vue-router";
import {
  PermissionPrivateMessagesTypeEnum,
  RepeatCommandConversationEnum,
} from "../../store/commands/types";
import AButton from "../../components/AButton/AButton.vue";
import { watch } from "vue";
import { isNullOrUndefined } from "../../helpers/isNullOrUndefined";
import { isNullOrUndefinedOrWhiteSpace } from "../../helpers/isNullOrUndefinedOrWhiteSpace";
import { icons } from "../../common/consts";
import ALinkify from "../../components/ALinkify/ALinkify.vue";
import ACommandSection from "../ACommands/ACommandSection.vue";
import ACommandArgument from "./ACommandArgument.vue";
import ACommandBreadcrumbs from "./ACommandBreadcrumbs.vue";
import { useApp } from "../../store/app/app";

const props = defineProps<ACommandProps>();
const router = useRouter();
const appStore = useApp();
const { nameCommand, command, parentCommand, aliases, store, relatedCommands } =
  useCommandInfo(props);

watch(
  () => props.id,
  () => {
    // сброс скролла при смене команды
    document.querySelector(".route-view")!.scroll(0, 0);
  },
  { flush: "post", immediate: true },
);
const {
  Icon12Tag,
  Icon12Articles,
  Icon16Attach,
  Icon16Pen,
  Icon16WarningTriangle,
  Icon12Flash,
  Icon12Question,
  Icon12View,
  Icon12Cards,
  Icon16WrenchOutline,
  Icon16KeyOutline,
} = icons;
</script>

<template>
  <div class="a-command">
    <ACommandBreadcrumbs
      :command="command"
      :name-command="nameCommand"
      :parent-command="parentCommand"
    />
    <template v-if="command">
      <ACommandSection>
        <template #label>
          <span>
            <Icon16Attach style="color: #6382ff; zoom: 0.75" /> Описание
          </span>
        </template>

        <ALinkify :value="command.helpExtended" tag="div" />
      </ACommandSection>

      <ACommandSection>
        <template #label>
          <span><Icon12Tag style="color: #259693" /> Названия </span>
        </template>
        <ol v-for="(alias, index) of aliases" :key="alias">
          <li>{{ index + 1 }}. {{ alias }}</li>
        </ol>
      </ACommandSection>

      <ACommandSection v-if="command.argumentsListString.length">
        <template #label>
          <span :title="command.argumentsListString">
            <Icon12Articles style="color: #63c23e" /> Аргументы
          </span>
        </template>
        <template #label-right>
          <AButton
            class="a-button__opacity zoom75"
            icon="Icon24InfoCircleOutline"
            target="_blank"
            to="https://vk.com/@animecm-arguments"
            @click.stop
          >
            Подробнее
          </AButton>
        </template>

        <div>
          <ACommandArgument
            v-for="(argument, index) of command.arguments"
            :key="index"
            :argument="argument"
            :index="index"
          />
        </div>
      </ACommandSection>

      <ACommandSection>
        <template #label>
          <span>
            <Icon16Pen style="color: #966525; zoom: 0.75" /> Полный пример
            <span v-if="appStore.isVkCom">(со всеми аргументами)</span>
          </span>
        </template>
        <pre style="user-select: contain">{{ command.templateString }}</pre>
      </ACommandSection>

      <ACommandSection
        v-if="command.templateString !== command.minTemplateString"
      >
        <template #label>
          <span>
            <Icon16Pen style="color: #966525; zoom: 0.75" /> Минимальный пример
            <span v-if="appStore.isVkCom">
              (только с обязательными аргументами)
            </span>
          </span>
        </template>
        <pre style="user-select: contain">{{ command.minTemplateString }}</pre>
      </ACommandSection>

      <ACommandSection>
        <template #label>
          <span>
            <Icon16WarningTriangle style="color: #ff7100; zoom: 0.75" />
            Требуемая роль
          </span>
        </template>
        {{ CommandHelper.getLevelText(command.accessLevel) }}
      </ACommandSection>

      <ACommandSection v-if="command.modifiers">
        <template #label>
          <span> ⚡ Модификаторы </span>
        </template>
        <div class="a-command__buttons">
          <AButton
            v-for="commandImplicitId of command.modifiers"
            :key="commandImplicitId"
            data-type="accent"
            @click="router.push('/command/' + commandImplicitId)"
          >
            {{ store.getCommandFullName(commandImplicitId) }}
          </AButton>
        </div>
      </ACommandSection>

      <ACommandSection
        v-for="commandImplicit of command.commandImplicit"
        v-if="command.commandImplicit"
        :key="commandImplicit.alias[0]"
      >
        <template #label>
          <span
            ><Icon12Flash style="color: #962525" /> Неявный модификатор</span
          >
        </template>

        <div class="a-command">
          <ACommandSection>
            <template #label>
              <span><Icon12Tag style="color: #259693" /> Названия</span>
            </template>
            {{ commandImplicit.alias.join(", ") }}
          </ACommandSection>

          <ACommandSection>
            <template #label>
              <span>
                <Icon16Attach style="color: #6382ff; zoom: 0.75" />
                Описание
              </span>
            </template>
            {{ commandImplicit.helpExtended }}
          </ACommandSection>

          <ACommandSection>
            <template #label>
              <span
                ><Icon12Question style="color: #969425" /> Использование</span
              >
            </template>
            {{ commandImplicit.help }}
          </ACommandSection>
        </div>
      </ACommandSection>

      <ACommandSection v-if="relatedCommands">
        <template #label>
          <span><Icon12Cards style="color: #226451" /> Связанные команды</span>
        </template>
        <div class="a-command__buttons">
          <AButton
            v-for="relatedCommandId of relatedCommands"
            :key="relatedCommandId"
            data-type="accent"
            @click="router.push('/command/' + relatedCommandId)"
          >
            {{ store.getCommandFullName(relatedCommandId) }}
          </AButton>
        </div>
      </ACommandSection>

      <ACommandSection v-for="(key, keyIndex) of command.keys" :key="key.key">
        <template #label>
          <span>
            <Icon16KeyOutline
              style="color: #f9c23c; width: 12px; height: 12px"
            />
            {{ key.header.replace("🔑", "") }}
            <template v-if="!isNullOrUndefined(key.accessLevel)">
              &nbsp;|
              <Icon16WarningTriangle style="color: #962590; zoom: 0.75" />
              Требуемая роль:
              {{ CommandHelper.getLevelText(key.accessLevel) }}
            </template>
          </span>
        </template>
        <template #label-right>
          <AButton
            v-if="keyIndex === 0"
            class="a-button__opacity zoom75"
            icon="Icon24InfoCircleOutline"
            target="_blank"
            to="https://vk.com/@animecm-man?anchor=klyuchi"
          >
            Подробнее
          </AButton>
        </template>
        <div v-if="key.isDon">
          <AButton
            class="bg-transparent pl-0 font-medium text-blue-600 dark:text-blue-500 hover:underline"
            icon="Icon24DollarCircleOutline"
            to="/don"
          >
            Требуется статус дона
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
      </ACommandSection>

      <ACommandSection>
        <template #label>
          <span>
            <Icon16WrenchOutline style="color: #83668c; zoom: 0.75" /> Тип
          </span>
        </template>
        {{ CommandHelper.getType(command.type) }}
      </ACommandSection>

      <ACommandSection
        v-if="command.repeat === RepeatCommandConversationEnum.Yes"
      >
        <div class="command-boolean">
          🆘 Повторяет ответ в беседе, если была успешно выполнена в личных
          сообщениях.
        </div>
      </ACommandSection>

      <ACommandSection v-if="CommandHelper.isAccessLs(command.privateMessages)">
        <div class="command-boolean">
          <Icon12View style="color: #c0c1ff" />
          Разрешена всем ролям в личных сообщениях бота
          {{
            command.privateMessages ===
            PermissionPrivateMessagesTypeEnum.YesImportant
              ? " (принудительно)"
              : ""
          }}
        </div>
      </ACommandSection>

      <ACommandSection v-if="command.notPrivateMessages">
        <div class="command-boolean">
          🚦 Можно использовать только в беседе.
        </div>
      </ACommandSection>

      <ACommandSection v-if="command.onlyPrivateMessages">
        <div class="command-boolean">
          🚦 Можно использовать только в личных сообщениях бота.
        </div>
      </ACommandSection>
    </template>
  </div>
</template>

<style lang="scss">
.a-command {
  background: var(--vkui--color_background_content);
  border-radius: var(--vkui--size_border_radius_paper--regular, 12px);
  color: var(--vkui--color--text_primary);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 15px;
  overflow-y: scroll;
  padding-block: 10px;
  padding-inline: 8px;

  .a-command {
    background: inherit;
    overflow-y: auto;

    section {
      background: var(--vkui--color_background_content);
    }
  }

  section {
    background: var(--vkui--color_background);
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 5px;

    header {
      border-block: 0.5px solid var(--vkui--color_text_tertiary);
      border-radius: 5px;
      display: flex;
      font-style: oblique;
      font-weight: 500;
      justify-content: space-between;

      span {
        align-items: center;
        display: flex;
        gap: 5px;
        text-align: left;

        svg {
          margin-left: 5px;
        }
      }
    }

    pre {
      font-family: inherit;
    }
  }

  .a-command__section-content {
    padding: 5px;
  }

  .command-boolean {
    align-items: center;
    display: flex;
    font-size: var(--vkui--font_headline1--font_size--compact, 15px);
    font-weight: 500;
    gap: 5px;
    line-height: var(--vkui--font_headline1--line_height--compact, 20px);
  }
}

.a-command__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
