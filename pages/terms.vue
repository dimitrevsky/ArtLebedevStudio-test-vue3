<script setup>
useSeoMeta({
  title: "Условия пользования",
  description: "Тестовое задание для Artlebedev",
});
</script>

<template>
  <main>
    <div class="terms">
      <h1 class="terms-title">Условия пользования</h1>
      <span class="terms-content">
        Добро пожаловать на наш сайт! Пожалуйста, внимательно ознакомьтесь с этими условиями пользования, прежде чем
        использовать наш сервис. Используя наш сайт, вы соглашаетесь соблюдать эти условия. Если вы не согласны с этими
        условиями, пожалуйста, не используйте наш сайт.
      </span>
    </div>
  </main>
</template>

<style scoped>
.terms {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: auto;
  margin-top: 32px;
  max-width: 800px;

  .terms-title {
    font-size: var(--font-size-title-small);
  }

  .terms-content {
    font-size: var(--font-size-text);
  }
}
</style>
