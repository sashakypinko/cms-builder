import { TFunction } from 'i18next';

export const makeErrorsObjectFromResponse = <T extends Record<string, { key: string }>>(
  t: TFunction,
  errors: T
): Record<keyof T, string> => {
  const result: Partial<Record<keyof T, string>> = {};

  Object.keys(errors).forEach((key: keyof T) => {
    result[key] = t(`validation.${errors[key].key}`);
  });

  return result as Record<keyof T, string>;
};
