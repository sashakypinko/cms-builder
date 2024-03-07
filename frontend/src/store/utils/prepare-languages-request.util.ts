import { type ILanguage } from '../../services/api/language/dto/language.dto';

export interface ParsedTranslation {
  key: string;
  value: string;
}

const prepareLanguagesRequest = (data: ILanguage): ILanguage => {
  const translations = data.translations.reduce((acc: Record<string, string>, item: ParsedTranslation) => {
    acc[item.key] = item.value;
    return acc;
  }, {});

  return {
    ...data,
    translations: JSON.stringify(translations),
  };
};

export default prepareLanguagesRequest;
