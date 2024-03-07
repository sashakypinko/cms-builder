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
} from '../actions/users';
import { UsersState } from '../init-state';
import type Action from '../actions/action.interface';

const users = (state: App.Store.Users = UsersState, { type, payload }: Action) => {
  switch (type) {
    case GET_USERS_REQUEST:
      return { ...state, loading: true, error: [], };

    case GET_USERS_SUCCESS:
      return { ...state, users: payload, loading: false, error: [] };

    case GET_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case ACTIVATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ACTIVATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case ACTIVATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DEACTIVATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DEACTIVATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DEACTIVATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default users;
