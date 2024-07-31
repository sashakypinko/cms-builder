import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { INotification } from '../../services/api/notification/dto/notification.dto';
import { ChangeNotificationViewedActionPayload, NotificationsState, RemoveNotificationActionPayload } from './types';

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  updating: false,
  removing: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    getNotifications: (state: NotificationsState) => {
      state.loading = true;
      state.error = null;
    },
    getNotificationsSuccess: (
      state: NotificationsState,
      { payload: notifications }: PayloadAction<INotification[]>,
    ) => {
      state.loading = false;
      state.notifications = notifications;
    },
    getNotificationsError: (state: NotificationsState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    addNotification: (state: NotificationsState, { payload: notification }: PayloadAction<INotification>) => {
      state.notifications.push(notification);
    },
    removeNotification: (state: NotificationsState, action: PayloadAction<RemoveNotificationActionPayload>) => {
      state.removing = true;
      state.error = null;
    },
    removeNotificationSuccess: (state: NotificationsState) => {
      state.removing = false;
    },
    removeNotificationError: (state: NotificationsState, { payload: error }: PayloadAction<any>) => {
      state.removing = false;
      state.error = error;
    },
    changeNotificationViewed: (
      state: NotificationsState,
      action: PayloadAction<ChangeNotificationViewedActionPayload>,
    ) => {
      state.updating = true;
      state.error = null;
    },
    changeNotificationViewedSuccess: (state: NotificationsState) => {
      state.updating = false;
    },
    changeNotificationViewedError: (state: NotificationsState, { payload: error }: PayloadAction<any>) => {
      state.updating = false;
      state.error = error;
    },
  },
});

export const {
  getNotifications,
  getNotificationsSuccess,
  getNotificationsError,
  addNotification,
  removeNotification,
  removeNotificationSuccess,
  removeNotificationError,
  changeNotificationViewed,
  changeNotificationViewedSuccess,
  changeNotificationViewedError,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
