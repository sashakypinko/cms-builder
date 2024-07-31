import ApiService from '../api-service';
import { type ILanguage } from './dto/language.dto';

class LanguageApiService extends ApiService {
  getAll = async (): Promise<ILanguage[]> => await this.get('').then((res) => res.data);

  getByCode = async (code: string): Promise<ILanguage> => await this.get(code).then((res) => res.data);
}

export const LanguageApi = new LanguageApiService('languages');
