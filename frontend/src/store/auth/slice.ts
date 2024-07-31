import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthResponseDto } from '../../services/api/auth/dto/auth-response.dto';
import { AuthState, EmailVerifyActionPayload, SignInActionPayload, SignUpActionPayload } from './types';
import { IUser } from '../../services/api/user/dto/user.dto';

const initialState: AuthState = {
  authUser: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signUp: (state: AuthState, action: PayloadAction<SignUpActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state: AuthState, { payload: authData }: PayloadAction<AuthResponseDto>) => {
      state.loading = false;
      state.authUser = authData.user;
    },
    signUpError: (state: AuthState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    signIn: (state: AuthState, action: PayloadAction<SignInActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state: AuthState, { payload: authData }: PayloadAction<AuthResponseDto>) => {
      state.loading = false;
      state.authUser = authData.user;
    },
    signInError: (state: AuthState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    logout: (state: AuthState) => {
      state.loading = true;
      state.error = null;
    },
    logoutSuccess: (state: AuthState) => {
      state.loading = false;
      state.authUser = null;
    },
    logoutError: (state: AuthState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    emailVerify: (state: AuthState, action: PayloadAction<EmailVerifyActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    emailVerifySuccess: (state: AuthState) => {
      state.loading = false;
      state.authUser = null;
    },
    emailVerifyError: (state: AuthState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    getAuthUser: (state: AuthState) => {
      state.loading = true;
      state.error = null;
    },
    getAuthUserSuccess: (state: AuthState, { payload }: PayloadAction<IUser>) => {
      state.loading = false;
      state.authUser = payload;
    },
    getAuthUserError: (state: AuthState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  signUp,
  signUpSuccess,
  signUpError,
  signIn,
  signInSuccess,
  signInError,
  logout,
  logoutSuccess,
  logoutError,
  emailVerify,
  emailVerifySuccess,
  emailVerifyError,
  getAuthUser,
  getAuthUserSuccess,
  getAuthUserError,
} = authSlice.actions;

export default authSlice.reducer;
