import { ReactElement, useEffect, useRef } from 'react';
import { Box, Checkbox, IconButton, ListItem, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { INotification } from '../../../../../../services/api/notification/dto/notification.dto';

interface Props {
  notification: INotification;
  onChangeViewed: () => void;
  onRemove: () => void;
}

const NotificationItem = ({ notification, onChangeViewed, onRemove }: Props): ReactElement => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onChangeViewed();
            ref.current && observer.unobserve(ref.current);
          }
        });
      },
      { threshold: 1.0 },
    );

    if (!notification.viewed && ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [notification, onChangeViewed]);

  const { title, content, route, createdAt, viewed } = notification;

  return (
    <ListItem ref={ref} sx={{ opacity: viewed ? 0.5 : 1 }} alignItems="center">
      <Checkbox edge="start" checked={viewed} onChange={() => onChangeViewed()} />
      <ListItemText
        primary={
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
        }
        secondary={
          <Box display="flex" flexDirection="column" gap={3}>
            <Typography color="textSecondary">{content}</Typography>
            <Typography fontSize="0.7rem" variant="caption" color="textSecondary">
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </Box>
        }
      />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={() => onRemove()}>
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default NotificationItem;
