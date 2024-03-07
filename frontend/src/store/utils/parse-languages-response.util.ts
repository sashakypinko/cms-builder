import type { ILanguage } from '../../services/api/language/dto/language.dto';

const parseLanguagesResponse = (data: ILanguage[]): ILanguage[] =>
  data.map((data) => {
    const parsedTranslations = Object.entries(JSON.parse(data.translations));

    return {
      ...data,
      translations: parsedTranslations.map(([key, value]) => ({
        key,
        value,
      })),
    };
  });

export default parseLanguagesResponse;
