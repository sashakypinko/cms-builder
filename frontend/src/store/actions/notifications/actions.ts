import type Action from '../action.interface';
import { ADD_NOTIFICATION_REQUEST, ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE, } from './action-types';

export const addNotification = (): Action => ({
  type: ADD_NOTIFICATION_REQUEST,
});

export const addNotificationSuccess = (notification: unknown): Action => ({
  type: ADD_NOTIFICATION_SUCCESS,
  payload: notification,
});

export const addNotificationError = (error: any): Action => ({
  type: ADD_NOTIFICATION_FAILURE,
  payload: error,
});
