import {
  ADD_NOTIFICATION_REQUEST,
  ADD_NOTIFICATION_SUCCESS,
  ADD_NOTIFICATION_FAILURE,
} from '../actions/notifications';
import { NotificationsState } from '../init-state';
import type Action from '../actions/action.interface';

const notifications = (state: App.Store.Notifications = NotificationsState, { type, payload }: Action) => {
  switch (type) {
    case ADD_NOTIFICATION_REQUEST:
      return {
        ...state,
        error: null,
      };

    case ADD_NOTIFICATION_SUCCESS:
      return {
        ...state,
        notifications: [payload],
        error: null,
      };

    case ADD_NOTIFICATION_FAILURE:
      return {
        ...state,
        error: payload,
      };

    default:
      return state;
  }
};

export default notifications;
