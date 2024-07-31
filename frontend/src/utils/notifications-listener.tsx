import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/notifications/slice';
import { Socket } from 'socket.io-client/build/esm/socket';
import NotificationSnackbar from '../components/widgets/notification-snackbar';
import { INotification } from '../services/api/notification/dto/notification.dto';

interface Props {
  socket: Socket | null;
}

const NotificationsListener = ({ socket }: Props) => {
  const [notification, setNotification] = useState<INotification | null>(null);
  const dispatch = useDispatch();

  const handleNotification = (newNotification: INotification) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(addNotification(newNotification));
    setNotification(newNotification);
  };

  useEffect(() => {
    socket && socket.on('notification', handleNotification);

    return () => {
      socket && socket.off('notification', handleNotification);
    };
  }, [socket, dispatch]);

  return (
    <NotificationSnackbar notification={notification} open={!!notification} onClose={() => setNotification(null)} />
  );
};

export default NotificationsListener;
