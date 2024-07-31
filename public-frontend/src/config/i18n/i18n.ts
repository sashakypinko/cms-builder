import type { ReadCallback } from 'i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import type { HttpBackendOptions } from 'i18next-http-backend';
import Backend from 'i18next-http-backend';
import { LanguageApi } from '../../services/api/language';

const DEFAULT_LNG = 'en';

const backendOptions = {
  loadPath: '{{lng}}|{{ns}}',
  request: (options: HttpBackendOptions, url: string, payload: any, callback: ReadCallback) => {
    const [lng] = url.split('|');
    try {
      LanguageApi.getByCode(lng).then((language) => {
        callback(null, {
          data: language.translations,
          status: 200,
        });
      });
    } catch (e) {
      console.error(e);
      callback(null, {
        status: 500,
      });
    }
  },
};

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    lng: DEFAULT_LNG,
    fallbackLng: DEFAULT_LNG,
    keySeparator: false,
    backend: backendOptions,
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
  });

export default i18n;
