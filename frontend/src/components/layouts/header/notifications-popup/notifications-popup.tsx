import { type MouseEvent, type ReactElement, useMemo, useState } from 'react';
import { Badge, IconButton, Menu, styled, useTheme } from '@mui/material';
import { Notifications } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifications } from '../../../../store/selectors';
import { changeNotificationViewed, removeNotification } from '../../../../store/notifications/slice';
import NotificationList from './notification-list';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -4,
    top: 0,
    fontSize: 12,
    background: theme.palette.error.main,
  },
}));

const NotificationsPopup = (): ReactElement => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { notifications, loading } = useSelector(selectNotifications);
  const theme = useTheme();
  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const unreadCount = useMemo(() => {
    return notifications.reduce((acc, { viewed }) => (viewed ? acc : acc + 1), 0);
  }, [notifications]);

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemove = (id: string) => {
    dispatch(removeNotification(id));
  };

  const handleChangeViewed = (id: string, viewed: boolean) => {
    dispatch(changeNotificationViewed({ id, viewed }));
  };

  return (
    <>
      <IconButton sx={{ ml: 1 }} onClick={handleOpen} color="inherit" disabled={loading}>
        <StyledBadge badgeContent={unreadCount} color="secondary">
          <Notifications sx={{ color: theme.palette.background.default }} />
        </StyledBadge>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
      >
        <NotificationList notifications={notifications} onChangeViewed={handleChangeViewed} onRemove={handleRemove} />
      </Menu>
    </>
  );
};

export default NotificationsPopup;
