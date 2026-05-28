import type { FormFieldSchema, FormSchema } from "~/types/form";

// логика моей валидации. Хук
export const useFormValidator = () => {
  const errors = ref<Record<string, string>>({});

  const validateField = (field: FormFieldSchema, value: any) => {
    if (field.required && (!value || value === "")) {
      return "Обязательное поле";
    }

    if (field.minLength && String(value).length < field.minLength) {
      return `Минимальная длина ${field.minLength} символов`;
    }

    if (field.pattern && !new RegExp(field.pattern).test(value)) {
      return "Не тот формат";
    }

    return "";
  };

  const validateForm = (schema: FormSchema, data: Record<string, any>) => {
    let isValid = true;
    schema.fields.forEach((field) => {
      const error = validateField(field, data[field.model]);
      if (error) {
        errors.value[field.model] = error;
        isValid = false;
      } else {
        delete errors.value[field.model];
      }
    });
    return isValid;
  };

  return {
    errors,
    validateField,
    validateForm,
  };
};
