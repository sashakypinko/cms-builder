import { ReactElement } from 'react';
import { Box, Paper, Snackbar as MuiSnackbar, Typography } from '@mui/material';
import { INotification } from '../../../services/api/notification/dto/notification.dto';
import { Notifications } from '@mui/icons-material';

interface Props {
  notification: INotification | null;
  open: boolean;
  onClose: () => void;
}

const NotificationSnackbar = ({ notification, open, onClose }: Props): ReactElement | null => {
  if (!notification) {
    return null;
  }

  const { title, content, route } = notification;
  return (
    <MuiSnackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={7000}
      onClose={onClose}
    >
      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 3 }}>
        <Notifications fontSize="large" />
        <Box>
          <Typography variant="h6">
            {title}
            {route && (
              <Typography
                component="a"
                href={route}
                variant="body2"
                color="textSecondary"
                style={{ marginLeft: '10px' }}
              >
                (Link)
              </Typography>
            )}
          </Typography>
          <Typography color="textSecondary">{content}</Typography>
        </Box>
      </Paper>
    </MuiSnackbar>
  );
};

export default NotificationSnackbar;
