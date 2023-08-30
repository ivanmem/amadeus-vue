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
import { useAppCaption } from "../../hooks/useAppCaption";
import ALinkify from "../../components/ALinkify/ALinkify.vue";
import ACommandSection from "../ACommands/ACommandSection.vue";
import ACommandArgument from "./ACommandArgument.vue";

const props = defineProps<ACommandProps>();
const router = useRouter();
const { nameCommand, command, store, relatedCommands } = useCommandInfo(props);
useAppCaption(nameCommand);

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
  <div v-if="command" class="a-command">
    <ACommandSection default-open>
      <template #label>
        <span
          ><Icon16Attach style="color: #6382ff; zoom: 0.75" /> Описание</span
        >
      </template>

      <ALinkify tag="div" :value="command.helpExtended" />
    </ACommandSection>

    <section>
      <header>
        <span><Icon12Tag style="color: #259693" /> Названия</span>
      </header>
      <div>
        {{ command.alias.join(", ") }}
      </div>
    </section>

    <ACommandSection v-if="command.argumentsListString.length" disclosure>
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
          :index="index"
          :argument="argument"
        />
      </div>
    </ACommandSection>
    <!--    <section v-if="command.argumentsListString.length">-->
    <!--      <Disclosure v-slot="{ open }">-->
    <!--        <DisclosureButton>-->
    <!--          <header>-->
    <!--            <span :title="command.argumentsListString">-->
    <!--              <Icon12Articles style="color: #63c23e" /> Аргументы-->
    <!--            </span>-->
    <!--            <div class="flex items-center">-->
    <!--              <AButton-->
    <!--                class="a-button__opacity zoom75"-->
    <!--                icon="Icon24InfoCircleOutline"-->
    <!--                target="_blank"-->
    <!--                to="https://vk.com/@animecm-arguments"-->
    <!--                @click.stop-->
    <!--              >-->
    <!--                Подробнее-->
    <!--              </AButton>-->
    <!--              <component-->
    <!--                :is="open ? Icon24ChevronUp : Icon24ChevronDown"-->
    <!--                :style="{ width: '20px', height: '20px' }"-->
    <!--              />-->
    <!--            </div>-->
    <!--          </header>-->
    <!--        </DisclosureButton>-->
    <!--        <DisclosurePanel>-->
    <!--          <div>-->
    <!--            <ACommandArgument-->
    <!--              v-for="(argument, index) of command.arguments"-->
    <!--              :key="index"-->
    <!--              :index="index"-->
    <!--              :argument="argument"-->
    <!--            />-->
    <!--          </div>-->
    <!--        </DisclosurePanel>-->
    <!--      </Disclosure>-->
    <!--    </section>-->

    <section>
      <header>
        <span>
          <Icon16Pen style="color: #966525; zoom: 0.75" /> Полный пример (со
          всеми аргументами)
        </span>
      </header>
      <div>
        <pre style="user-select: contain">{{ command.templateString }}</pre>
      </div>
    </section>

    <section v-if="command.templateString !== command.minTemplateString">
      <header>
        <span>
          <Icon16Pen style="color: #966525; zoom: 0.75" /> Минимальный
          пример(только с обязательными аргументами)
        </span>
      </header>
      <div>
        <pre style="user-select: contain">{{ command.minTemplateString }}</pre>
      </div>
    </section>

    <section v-if="command.templateString !== command.minTemplateString">
      <header>
        <span>
          <Icon16WarningTriangle style="color: #ff7100; zoom: 0.75" />
          Требуемая роль
        </span>
      </header>
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

    <ACommandSection
      v-for="commandImplicit of command.commandImplicit"
      v-if="command.commandImplicit"
      :key="commandImplicit.alias[0]"
    >
      <template #label>
        <span><Icon12Flash style="color: #962525" /> Неявный модификатор</span>
      </template>

      <div class="a-command">
        <section>
          <header>
            <span><Icon12Tag style="color: #259693" /> Названия</span>
          </header>
          <div>
            {{ commandImplicit.alias.join(", ") }}
          </div>
        </section>

        <section>
          <header>
            <span>
              <Icon16Attach style="color: #6382ff; zoom: 0.75" />
              Описание
            </span>
          </header>
          <div>
            {{ commandImplicit.helpExtended }}
          </div>
        </section>

        <section>
          <header>
            <span><Icon12Question style="color: #969425" /> Использование</span>
          </header>
          <div>
            {{ commandImplicit.help }}
          </div>
        </section>
      </div>
    </ACommandSection>

    <section v-if="relatedCommands">
      <header>
        <span><Icon12Cards style="color: #226451" /> Связанные команды</span>
      </header>
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
          <Icon16KeyOutline style="color: #f9c23c; zoom: 0.75" />
          {{ key.header.replace("🔑", "") }}
          <template v-if="!isNullOrUndefined(key.accessLevel)">
            &nbsp;|
            <Icon16WarningTriangle style="color: #962590; zoom: 0.75" />
            Требуемая роль:
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
        <AButton icon="Icon24DollarCircleOutline" to="/don">
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
    </section>

    <section>
      <header>
        <span>
          <Icon16WrenchOutline style="color: #83668c; zoom: 0.75" /> Тип
        </span>
      </header>
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
        <Icon12View style="color: #c0c1ff" />
        Разрешена всем ролям в личных сообщениях бота
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

<style lang="scss">
.a-command {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 10px;
  gap: 15px;
  background: var(--vkui--color_background_content);
  color: var(--vkui--color--text_primary);
  border-radius: var(--vkui--size_border_radius_paper--regular, 12px);
  overflow-y: scroll;

  .a-command {
    background: inherit;
    overflow-y: auto;

    section {
      background: var(--vkui--color_background_content);
    }
  }

  section {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: var(--vkui--color_background);
    border-radius: 5px;

    header {
      display: flex;
      justify-content: space-between;
      border-block: 0.5px solid var(--vkui--color_text_tertiary);
      border-radius: 5px;
      font-weight: 500;
      font-style: oblique;

      span {
        display: flex;
        align-items: center;
        gap: 5px;

        svg {
          margin-left: 5px;
        }
      }
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
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px;
    font-size: var(--vkui--font_headline1--font_size--compact, 15px);
    font-weight: 500;
    line-height: var(--vkui--font_headline1--line_height--compact, 20px);
  }
}

.a-command__buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
