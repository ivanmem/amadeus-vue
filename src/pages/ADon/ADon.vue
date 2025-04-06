<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import AButton from "../../components/AButton/AButton.vue";
import { darkColorScheme } from "../../common/consts";
import { useAppCaption } from "../../hooks/useAppCaption";
import { useApp } from "../../store/app/app";
import { Icon16Link } from "vue-vkontakte-icons";

useAppCaption("Дон Статус");
const appService = useApp();

const products = [
  {
    caption: "1 месяц (30 дней)",
    to: "https://vk.com/market-178374368?w=product-178374368_4186671%2Fquery",
  },
  {
    caption: "3 месяца (90 дней)",
    to: "https://vk.com/market-178374368?w=product-178374368_4186977%2Fquery",
  },
  {
    caption: "6 месяцев (180 дней)",
    to: "https://vk.com/market-178374368?w=product-178374368_4186979%2Fquery",
  },
];
</script>
<template>
  <APageContainer class="a-don">
    <template v-if="appService.isApp">
      Эта страница недоступна с приложения.
    </template>
    <template v-else>
      <AButton
        data-type="accent"
        :icon="Icon16Link"
        style="max-width: 300px"
        to="https://vk.com/@animecm-don"
      >
        Подробно про статус дона
      </AButton>

      <div>
        <h3 style="padding: 10px 0">Товар «<b>Дон статус</b>»</h3>
        <div class="a-button__left-content-block">
          <AButton
            v-for="product of products"
            :key="product.caption"
            :to="product.to"
            class="a-button__left-content"
            data-type="accent"
            :icon="Icon16Link"
          >
            {{ product.caption }}
          </AButton>
        </div>
        <div style="padding: 10px 0">
          Все денежные средства, переведённые в счёт оплаты "Статуса дона", идут
          на развитие проекта и рассматриваются как добровольные пожертвования.
          Возврат не предусмотрен.
        </div>
      </div>

      <AButton
        data-type="accent"
        :icon="Icon16Link"
        style="max-width: 300px"
        to="https://vk.com/@animecm-terms-of-use"
      >
        Пользовательское соглашение
      </AButton>

      <div>
        <h2>Контактные данные</h2>
        Мелентьев Иван Андреевич, Почта: animecm@mail.ru, ИНН: 500178253300
      </div>

      <a
        class="self-start"
        href="https://yookassa.ru/protection?utm_campaign=kassa_protection&utm_source=merchants"
        rel="noopener"
        target="_blank"
      >
        <picture>
          <source
            v-if="darkColorScheme"
            srcset="
              https://yoomoney.ru/i/html-letters/safe-kassa-logo-white.svg
            "
          />
          <img
            alt="Платежи под защитой ЮKassa."
            height="60"
            src="https://yoomoney.ru/i/html-letters/safe-kassa-logo-black.svg"
            width="173"
          />
        </picture>
      </a>
    </template>
  </APageContainer>
</template>
<style lang="scss">
.a-don {
  gap: 20px;
}

.a-don__products__list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-width: 240px;
  padding-top: 5px;
}
</style>
