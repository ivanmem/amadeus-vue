<script lang="ts" setup>
import APageContainer from "../../components/APageContainer/APageContainer.vue";
import AButton from "../../components/AButton/AButton.vue";
import { darkColorScheme } from "../../common/consts";
import { useAppCaption } from "../../hooks/useAppCaption";

useAppCaption("Дон Статус");

const products = [
  {
    caption: "Дон статус на 1 месяц (30 дней)",
    to: "https://vk.com/market-178374368?w=product-178374368_4186671%2Fquery",
  },
  {
    caption: "Дон статус на 3 месяца (90 дней)",
    to: "https://vk.com/market-178374368?w=product-178374368_4186977%2Fquery",
  },
  {
    caption: "Дон статус на 6 месяцев (180 дней)",
    to: "https://vk.com/market-178374368?w=product-178374368_4186979%2Fquery",
  },
];
</script>
<template>
  <APageContainer class="a-don">
    <AButton
      data-size="middle"
      data-type="accent"
      to="https://vk.com/@animecm-don"
    >
      Подробно про статус дона
    </AButton>

    <div>
      <h3>Каталог товаров</h3>
      <div class="a-don__products__list">
        <AButton
          v-for="product of products"
          :key="product.caption"
          :to="product.to"
          class="a-button__block"
          data-size="middle"
        >
          {{ product.caption }}
        </AButton>
      </div>
      <div>
        Цена минимальная, с такой мы ничего не зарабатываем. Всё уходит на поддержку сервера. Даже в минус уходим.
      </div>
    </div>

    <AButton
      data-size="middle"
      data-type="accent"
      to="https://vk.com/@animecm-terms-of-use"
    >
      Пользовательское соглашение
    </AButton>

    <div>
      <h2>Контактные данные</h2>
      Мелентьев Иван Андреевич, Почта: animecm@mail.ru, ИНН: 500178253300
    </div>

    <a
      href="https://yookassa.ru/protection?utm_campaign=kassa_protection&utm_source=merchants"
      rel="noopener"
      target="_blank"
    >
      <picture>
        <source
          v-if="darkColorScheme"
          srcset="https://yoomoney.ru/i/html-letters/safe-kassa-logo-white.svg"
        />
        <img
          alt="Платежи под защитой ЮKassa."
          height="60"
          src="https://yoomoney.ru/i/html-letters/safe-kassa-logo-black.svg"
          width="173"
        />
      </picture>
    </a>
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
