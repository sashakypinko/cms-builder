import ApiService from '../api-service';
import { type ILanguage } from './dto/language.dto';

class LanguageApiService extends ApiService {
  getAll = async (): Promise<ILanguage[]> => await this.get('').then((res) => res.data);

  getByCode = async (code: string): Promise<ILanguage> => await this.get(code).then((res) => res.data);

  create = async (language: ILanguage): Promise<ILanguage> => await this.post('', language).then((res) => res.data);

  update = async (language: ILanguage): Promise<ILanguage> =>
    await this.put(language._id || '', language).then((res) => res.data);

  deleteByIds = async (ids: string[]): Promise<ILanguage> =>
    await this.post('remove-by-ids', { ids }).then((res) => res.data);

  deleteTranslationKeys = async (keys: string[]): Promise<ILanguage> =>
    await this.post('remove-translation-keys', { keys }).then((res) => res.data);
}

export const LanguageApi = new LanguageApiService('languages');
