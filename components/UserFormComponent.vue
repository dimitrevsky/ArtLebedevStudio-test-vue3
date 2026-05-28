<script setup lang="ts">
import FormGenerator from "./form/FormGenerator.vue";
import type { FormSchema } from "~/types/form";

const formSchema: FormSchema = {
  fields: [
    { type: "text", label: "Имя", model: "name", required: true },
    { type: "email", label: "Почта", model: "email", required: true },
    { type: "password", label: "Пароль", model: "password", minLength: 6, required: true },
    { type: "select", label: "Роль", model: "role", options: ["Админ", "Пользователь"], required: true },
    { type: "checkbox", label: "Я обязуюсь позвать этого разработчика на интервью", model: "terms", required: true },
  ],
};

const data = ref({
  name: "",
  email: "",
  password: "",
  role: "",
  terms: false,
});

const handleSuccsess = (finalData: any) => {
  console.log("Готово к отправке:", finalData);
  alert("Форма успешно отправлена смотри консоль");
};
</script>

<template>
  <div class="form-container">
    <FormGenerator :schema="formSchema" v-model="data" @submit="handleSuccsess" />
  </div>
</template>

<style scoped></style>
