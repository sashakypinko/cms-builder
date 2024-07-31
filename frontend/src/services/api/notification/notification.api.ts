import ApiService from '../api-service';
import { type INotification } from './dto/notification.dto';

class NotificationApiService extends ApiService {
  getAll = async (): Promise<INotification> => await this.get('').then((res) => res.data);

  remove = async (id: string): Promise<INotification> => await this.delete(id).then((res) => res.data);

  changeViewed = async (id: string, viewed: boolean): Promise<INotification> =>
    await this.patch(`${id}/change-viewed`, { viewed }).then((res) => res.data);
}

export const NotificationApi = new NotificationApiService('notifications');
