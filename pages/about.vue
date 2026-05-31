<script setup lang="ts">
useSeoMeta({
  title: "О тестовом | Artlebedev",
  description: "Описание реализации динамического генератора форм на Nuxt 3",
});

const stacks = ["Nuxt 3", "TypeScript", "Composition API", "SweatAlert2"];
const results = [
  "Динамическая генерация полей формы",
  "Поддержка text / email / password",
  "Поддержка select и checkbox",
  "Реактивное обновление данных через v-model",
  "Валидация required / minLength / patter",
  "Компонентая архетектура",
  "TypeScript типизация",
];
</script>

<template>
  <main class="about">
    <section class="about__content">
      <h1 class="about__title">О проекте</h1>

      <p class="about__text">
        Это тестовое задание для студии Артемия Лебедева, реализованное на Nuxt3 - setup + CompositionAPI.
      </p>

      <p class="about__text">
        Основная задача проекта — создание универсального компонента генерации форм на основе JSON-схемы.
      </p>

      <h2 class="about__subtitle">Чо сделал</h2>

      <p class="about__list">
        <span class="about__list--item" v-for="result in results">
          {{ result }}
        </span>
      </p>

      <h2 class="about__subtitle">Технологии</h2>

      <div class="about__stack">
        <span class="about__stack-item" v-for="tech in stacks" :key="tech">{{ tech }}</span>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about {
  display: flex;
  justify-content: center;
  padding: 40px 20px;

  .about__content {
    width: min(800px, 100%);
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 30px;

    .about__title {
      font-size: var(--font-size-title);
    }

    .about__subtitle {
      margin-top: 12px;
      font-size: var(--font-size-title-small);
    }

    .about__text {
      line-height: 1.6;
      font-size: var(--font-size-text);
    }

    .about__list {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding-left: 20px;

      .about__list--item {
        &::before {
          content: "●";
          margin-right: 7px;
          color: var(--accent-color);
        }
      }
    }

    .about__stack {
      display: flex;
      gap: 12px;

      .about__stack-item {
        padding: 8px 14px;
        border-radius: 22px;
        border: 1px solid var(--accent-color);
      }
    }
  }
}
</style>
