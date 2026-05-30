<script lang="ts" setup>
import { useFormValidator } from "~/composables/useFormValidator";
import type { FormSchema } from "~/types/form";

const props = defineProps<{ schema: FormSchema }>();
const emit = defineEmits(["submit"]);

const formData = defineModel<Record<string, any>>({ required: true });

const { errors, validateField, validateForm, clearErrors } = useFormValidator();

const onInput = (field: any, value: any) => {
  formData.value[field.model] = value;

  const error = validateField(field, value);
  if (error) {
    errors.value[field.model] = error;
  } else {
    clearErrors(field.model);
  }
};

const onSubmit = () => {
  if (validateForm(props.schema, formData.value)) {
    emit("submit", formData.value);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="form-generator">
    <div class="form-title"><h1>Заполните форму</h1></div>

    <div v-for="field in schema.fields" :key="field.model" class="field">
      <!-- Текстовые поля (text, email, password) -->
      <input
        v-if="['text', 'email', 'password'].includes(field.type)"
        :type="field.type"
        :value="formData[field.model]"
        :placeholder="errors[field.model] || field.label"
        @input="onInput(field, ($event.target as HTMLInputElement).value)"
        :class="{ 'error-active': errors[field.model] }"
        class="input"
      />

      <!-- Выпадающий список -->
      <select
        v-else-if="field.type === 'select'"
        :value="formData[field.model]"
        @change="onInput(field, ($event.target as HTMLSelectElement).value)"
        :class="{ 'error-active': errors[field.model] }"
        class="select"
      >
        <option value="" disabled>
          {{ errors[field.model] || "Выбрать из списка..." }}
        </option>
        <option v-for="opt in field.options" :key="opt" :value="opt">{{ opt }}</option>
      </select>

      <!-- Чекбокс -->
      <div v-else-if="field.type === 'checkbox'" class="checkbox__wrapper">
        <label class="checkbox__label" :for="field.model">
          <input
            class="checkbox-hidden"
            type="checkbox"
            :id="field.model"
            :checked="formData[field.model]"
            @change="onInput(field, ($event.target as HTMLInputElement).checked)"
          />
          <span class="checkbox__checkmark"></span>

          <span class="checkbox__text" v-if="!errors[field.model]">
            {{ field.label + " и соглашаюсь с " }}
            <NuxtLink to="/terms" class="checkbox__terms-link">условиями пользования</NuxtLink>
          </span>

          <span class="checkbox__error" v-else>
            {{ errors[field.model] }}
          </span>
        </label>
      </div>
    </div>

    <button type="submit" class="btn-submit">Отправить</button>
  </form>
</template>

<style scoped>
.form-generator {
  display: flex;
  background-color: var(--secondary-surface-color);
  margin: auto;
  margin-top: 200px;
  flex-flow: column;
  width: min(400px, 95%);
  border: 3px solid var(--accent-color);
  border-radius: 24px;
  padding: 24px;
  font-size: var(--font-size-subtitle);

  .form-title {
    text-align: center;
    margin-bottom: 16px;
  }

  .input {
    &::placeholder {
      color: var(--supporting-color);
      opacity: 0.7;
    }
  }

  .input,
  .select {
    width: 100%;
    padding: 8px;
    border-radius: 16px;
    margin-bottom: 8px;
    border: 2px solid var(--supporting-color);
    background-color: var(--secondary-surface-color);
    color: var(--supporting-color);
    padding: 12px;
    will-change: border-color;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: var(--accent-color);
    }

    &.error-active {
      border-color: var(--error-color);
    }
  }

  .select {
    padding-right: 10px;
    width: 100%;
    border: 2px solid var(--supporting-color);
    background-color: var(--secondary-surface-color);

    option {
      font-size: var(--font-size-text);
      height: 40px;
    }
  }

  .checkbox__label {
    display: inline-flex;
    align-items: center;
    margin-bottom: 8px;
    height: 26px;
    font-size: var(--font-size-small);
    cursor: pointer;

    &:hover .checkbox__checkmark {
      background-color: var(--accent-color);
    }

    .checkbox-hidden {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);

      &:focus-within + .checkbox__checkmark {
        outline: 2px solid var(--accent-color);
      }

      &:checked + .checkbox__checkmark {
        background-color: var(--accent-color);
      }
    }

    .checkbox__checkmark {
      min-width: 20px;
      height: 20px;
      border: 2px solid var(--supporting-color);
      border-radius: 4px;
      position: relative;
      transition: background-color 0.3s ease;
    }

    .checkbox__terms-link {
      color: var(--accent-color);
      text-decoration: underline;
    }

    .checkbox__text {
      margin-left: 10px;
    }

    .checkbox__error {
      margin-left: 10px;
      color: var(--error-color);
      font-size: var(--font-size-small);
    }
  }

  .btn-submit {
    color: var(--secondary-surface-color);
    background-color: var(--accent-color);
    border: none;
    padding: 12px;
    border-radius: 16px;
    font-size: var(--font-size-subtitle);
    cursor: pointer;
    transition: background-color 0.3s ease;
    will-change: background-color;

    &:hover {
      background-color: #a0c00f;
    }

    &:active {
      background-color: #7f900b;
    }
  }

  .is-active {
    background-color: var(--error-color);
  }
}
</style>
