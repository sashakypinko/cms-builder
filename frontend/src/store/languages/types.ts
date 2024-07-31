import { ILanguage } from '../../services/api/language/dto/language.dto';

export type LanguagesState = {
  languages: ILanguage[];
  loading: boolean;
  error: any;
};

export type LanguageActionPayload = {
  language: ILanguage;
  onSuccess: () => void;
  onError: (error: any) => void;
};

export type DeleteLanguagesActionPayload = {
  ids: string[];
  onSuccess: () => void;
  onError: (error: any) => void;
};

export type DeleteTranslationKeysActionPayload = {
  keys: string[];
  onSuccess: () => void;
  onError: (error: any) => void;
};
