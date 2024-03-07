import ApiService from '../api-service';
import { type IUser } from './dto/user.dto';

class UserApiService extends ApiService {
  getAll = async (): Promise<IUser[]> => await this.get('').then((res) => res.data);

  deleteById = async (id: string): Promise<IUser> =>
    await this.delete(id).then((res) => res.data);

  activate = async (id: string): Promise<IUser> =>
    await this.post(`activate/${id}`).then((res) => res.data);

  deactivate = async (id: string): Promise<IUser> =>
    await this.post(`deactivate/${id}`).then((res) => res.data);

}

export const UserApi = new UserApiService('users');
