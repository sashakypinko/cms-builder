import ApiService from '../api-service';
import { type IPage } from './dto/page.dto';

class PageApiService extends ApiService {
  getAll = async (): Promise<IPage[]> => await this.get('').then((res) => res.data);

  create = async (data: IPage): Promise<IPage> => await this.post('', data, false).then((res) => res.data);

  update = async (data: IPage): Promise<IPage> => await this.put(data._id || '', data, false).then((res) => res.data);

  remove = async (id: string): Promise<IPage> => await this.delete(id).then((res) => res.data);
}

export const PageApi = new PageApiService('pages');
