import { type AuthResponseDto } from '../../../services/api/auth/dto/auth-response.dto';
import { type SignInRequestDto } from '../../../services/api/auth/dto/sign-in-request.dto';
import { type SignUpRequestDto } from '../../../services/api/auth/dto/sign-up-request.dto';
import type Action from '../action.interface';
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
  VERIFY_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from './action-types';

export const signUp = (
  requestData: SignUpRequestDto,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: SIGN_UP_REQUEST,
  payload: requestData,
  meta: {
    onSuccess,
    onError,
  },
});

export const signUpSuccess = (responseData: AuthResponseDto): Action => ({
  type: SIGN_UP_SUCCESS,
  payload: responseData,
});

export const signUpError = (error: any): Action => ({
  type: SIGN_UP_FAILURE,
  payload: error,
});

export const signIn = (
  requestData: SignInRequestDto,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: SIGN_IN_REQUEST,
  payload: requestData,
  meta: {
    onSuccess,
    onError,
  },
});

export const signInSuccess = (responseData: AuthResponseDto): Action => ({
  type: SIGN_IN_SUCCESS,
  payload: responseData,
});

export const signInError = (error: any): Action => ({
  type: SIGN_IN_FAILURE,
  payload: error,
});

export const logout = (): Action => ({
  type: LOGOUT_REQUEST,
});

export const logoutSuccess = (): Action => ({
  type: LOGOUT_SUCCESS,
});

export const logoutError = (error: any): Action => ({
  type: LOGOUT_FAILURE,
  payload: error,
});

export const setAuthData = (authData: AuthResponseDto): Action => ({
  type: SIGN_IN_SUCCESS,
  payload: authData,
});

export const verify = (code: string): Action => ({
  type: VERIFY_REQUEST,
  payload: code,
});

export const verifySuccess = (): Action => ({
  type: VERIFY_SUCCESS,
});

export const verifyError = (error: any): Action => ({
  type: VERIFY_FAILURE,
  payload: error,
});
