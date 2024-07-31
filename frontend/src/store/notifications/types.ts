import { INotification } from '../../services/api/notification/dto/notification.dto';

export type NotificationsState = {
  notifications: INotification[];
  loading: boolean;
  updating: boolean;
  removing: boolean;
  error: any;
};

export type RemoveNotificationActionPayload = string;

export type ChangeNotificationViewedActionPayload = {
  id: string;
  viewed: boolean;
};
