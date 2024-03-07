import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../store/actions/notifications';

interface Props {
  socket: WebSocket;
}

const NotificationsListener = ({ socket }: Props) => {
  const dispatch = useDispatch();

  const handleNotification = (event: Event) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dispatch(addNotification(event.data));
  };

  // useEffect(() => {
  //   socket.addEventListener('notification', handleNotification);
  //
  //   return () => {
  //     socket.removeEventListener('notification', handleNotification);
  //   };
  // }, [socket, dispatch]);

  return null;
};

export default NotificationsListener;
