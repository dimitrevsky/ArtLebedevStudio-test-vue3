import type { FormFieldSchema, FormSchema } from "~/types/form";

const VALIDATORS = {
  required: (value: any) => {
    if (value === undefined || value === null || value === "") return "Обязательное поле";

    if (typeof value === "boolean" && !value) return "Нужно согласиться :D";
    return "";
  },

  minLength: (value: any, length: number) => {
    if (!value && value !== 0) return "";
    return String(value).length >= length ? "" : `Минимальная длина ${length} символов`;
  },

  pattern: (value: any, pattern: string) => {
    if (!value && value !== 0) return "";
    return new RegExp(pattern).test(String(value)) ? "" : "Не тот формат";
  },
};

export const useFormValidator = () => {
  const errors = ref<Record<string, string>>({});

  const validateField = (field: FormFieldSchema, value: any): string => {
    if (field.required) {
      const error = VALIDATORS.required(value);
      if (error) return error;
    }

    if (field.minLength) {
      const error = VALIDATORS.minLength(value, field.minLength);
      if (error) return error;
    }

    if (field.pattern) {
      const error = VALIDATORS.pattern(value, field.pattern);
      if (error) return error;
    }

    return "";
  };

  const validateForm = (schema: FormSchema, data: Record<string, any>): boolean => {
    const newErrors: Record<string, string> = {};

    schema.fields.forEach((field) => {
      const error = validateField(field, data[field.model]);
      if (error) {
        newErrors[field.model] = error;
      }
    });

    errors.value = newErrors;

    return Object.keys(newErrors).length === 0;
  };

  const clearErrors = (model: string) => {
    if (errors.value[model]) {
      const newErrors = { ...errors.value };
      delete newErrors[model];
      errors.value = newErrors;
    }
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
  };
};
