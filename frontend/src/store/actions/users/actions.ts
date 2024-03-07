import type Action from '../action.interface';
import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  ACTIVATE_USER_REQUEST,
  ACTIVATE_USER_SUCCESS,
  ACTIVATE_USER_FAILURE,
  DEACTIVATE_USER_REQUEST,
  DEACTIVATE_USER_SUCCESS,
  DEACTIVATE_USER_FAILURE,
} from './action-types';
import { type IUser } from '../../../services/api/user/dto/user.dto';
import { type ActionCreatorWithMeta } from '../action-creator-types';

export const getUsers = (): Action => ({
  type: GET_USERS_REQUEST,
});

export const getUsersSuccess = (responseData: IUser[]): Action => ({
  type: GET_USERS_SUCCESS,
  payload: responseData,
});

export const getUsersError = (error: any): Action => ({
  type: GET_USERS_FAILURE,
  payload: error,
});

/* eslint-disable @typescript-eslint/no-empty-function */
export const deleteUser: ActionCreatorWithMeta = (id: string, onSuccess = () => {}, onError = () => {}): Action => ({
  type: DELETE_USER_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const deleteUserSuccess = (): Action => ({
  type: DELETE_USER_SUCCESS,
});

export const deleteUserError = (error: any): Action => ({
  type: DELETE_USER_FAILURE,
  payload: error,
});

/* eslint-disable @typescript-eslint/no-empty-function */
export const activateUser: ActionCreatorWithMeta = (id: string, onSuccess = () => {}, onError = () => {}): Action => ({
  type: ACTIVATE_USER_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const activateUserSuccess = (): Action => ({
  type: ACTIVATE_USER_SUCCESS,
});

export const activateUserError = (error: any): Action => ({
  type: ACTIVATE_USER_FAILURE,
  payload: error,
});

/* eslint-disable @typescript-eslint/no-empty-function */
export const deactivateUser: ActionCreatorWithMeta = (id: string, onSuccess = () => {}, onError = () => {}): Action => ({
  type: DEACTIVATE_USER_REQUEST,
  payload: id,
  meta: {
    onSuccess,
    onError,
  },
});

export const deactivateUserSuccess = (): Action => ({
  type: DEACTIVATE_USER_SUCCESS,
});

export const deactivateUserError = (error: any): Action => ({
  type: DEACTIVATE_USER_FAILURE,
  payload: error,
});


