<script setup lang="ts">
import type { FormSchema } from "~/types/form";

const props = defineProps<{
  schema: FormSchema;
  data: Record<string, any>;
}>();

const formatValue = (field: any, value: any) => {
  if (field.type === "password" && value) {
    return "•".repeat(value.length);
  }

  if (value === undefined || value === null || value === "") {
    return "Не указан(-о)";
  }

  return value;
};

const formatLabel = (field: any) => {
  if (field.type === "checkbox") {
    return "Согласие"
  }

  return field.label
};
</script>

<template>
  <div class="debugging">
    <h2 class="debugging-title">Дата формы</h2>

    <div v-for="field in schema.fields" :key="field.model" class="debugging-field">
      <span class="debugging-label"> {{ formatLabel(field) + ": " }}</span>

      <span class="debugging-value" :class="{ 'is-empty': !data[field.model] }">
        {{ formatValue(field, data[field.model]) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.debugging {
  display: flex;
  flex-flow: column;
  gap: 10px;
  margin-top: 20px;
  max-width: 400px;
  margin: auto;
  margin-top: 20px;
  padding: 20px;
  background-color: var(--secondary-surface-color);
  border: 2px solid var(--accent-color);
  border-radius: 8px;

  .debugging-title {
    margin: 0;
    font-size: var(--font-size-title);
    text-align: center;
  }

  .debugging-field {
    font-size: var(--font-size-body);

    .debugging-value {
      font-weight: bold;
      color: var(--accent-color);
    }

    .is-empty {
      opacity: 0.5;
      color: var(--error-color);
    }
  }
}
</style>
