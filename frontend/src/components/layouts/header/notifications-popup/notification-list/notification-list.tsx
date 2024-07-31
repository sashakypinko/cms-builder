import { Fragment, ReactElement, useMemo } from 'react';
import { Divider, List } from '@mui/material';
import { INotification } from '../../../../../services/api/notification/dto/notification.dto';
import NotificationItem from './notification-item';

interface Props {
  notifications: INotification[];
  onChangeViewed: (id: string, viewed: boolean) => void;
  onRemove: (id: string) => void;
}

const NotificationList = ({ notifications, onChangeViewed, onRemove }: Props): ReactElement => {
  const sortedNotifications = useMemo(() => {
    const sortByDate = (a: INotification, b: INotification) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

    return [...notifications].sort(sortByDate);
  }, [notifications]);

  return (
    <List sx={{ minWidth: 400, maxHeight: 600 }}>
      {sortedNotifications.map((notification) => (
        <Fragment key={notification._id}>
          <NotificationItem
            notification={notification}
            onChangeViewed={() => onChangeViewed(notification._id, !notification.viewed)}
            onRemove={() => onRemove(notification._id)}
          />
          <Divider />
        </Fragment>
      ))}
    </List>
  );
};

export default NotificationList;
