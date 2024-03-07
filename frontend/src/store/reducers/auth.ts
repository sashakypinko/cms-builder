import {
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
} from '../actions/auth';
import { AuthState } from '../init-state';
import type Action from '../actions/action.interface';

const auth = (state: App.Store.Auth = AuthState, { type, payload }: Action) => {
  switch (type) {
    case SIGN_UP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SIGN_UP_SUCCESS:
      return {
        ...state,
        authData: payload,
        loading: false,
        error: null,
      };

    case SIGN_UP_FAILURE:
      return {
        ...state,
        authData: null,
        loading: false,
        error: payload,
      };

    case SIGN_IN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authData: payload,
        loading: false,
        error: null,
      };

    case SIGN_IN_FAILURE:
      return {
        ...state,
        authData: null,
        loading: false,
        error: payload,
      };

    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGOUT_SUCCESS:
      return {
        ...state,
        authData: null,
        loading: false,
        error: null,
      };

    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case VERIFY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case VERIFY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case VERIFY_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default auth;
