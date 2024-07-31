import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import {
  signUpSuccess,
  signUpError,
  signInSuccess,
  signInError,
  logoutSuccess,
  logoutError,
  emailVerifySuccess,
  emailVerifyError,
  getAuthUserSuccess,
  getAuthUserError,
} from './slice';
import { AuthApi } from '../../services/api/auth';
import { AuthStorage } from '../../services/storage/auth.storage';
import { PayloadAction } from '@reduxjs/toolkit';
import { EmailVerifyActionPayload, SignInActionPayload, SignUpActionPayload } from './types';

export function* signUpSaga({ payload }: PayloadAction<SignUpActionPayload>): SagaIterator {
  try {
    const data = yield call(AuthApi.signUp, payload.data);
    yield put(signUpSuccess({ user: data.user }));
    payload.onSuccess();
  } catch (error: any) {
    console.log([error]);
    yield put(signUpError(error));
    payload.onError(error?.response?.data || error?.data);
  }
}

export function* signInSaga({ payload }: PayloadAction<SignInActionPayload>): SagaIterator {
  try {
    const data = yield call(AuthApi.signIn, payload.data);
    yield put(signInSuccess({ user: data.user }));
    yield call(AuthStorage.storeUser, data.user);
    yield call(AuthStorage.storeAccessToken, data.accessToken);
    yield call(AuthStorage.storeRefreshToken, data.refreshToken);
    yield call(payload.onSuccess);
    yield call(() => {
      window.location.reload();
    });
  } catch (error: any) {
    console.log([error]);
    yield put(signInError(error));
    payload.onError(error?.response?.data || error?.data);
  }
}

export function* logoutSaga(): SagaIterator {
  try {
    yield call(AuthApi.logout);
    yield put(logoutSuccess());
    yield call(AuthStorage.removeUser);
    yield call(AuthStorage.removeAccessToken);
    yield call(AuthStorage.removeRefreshToken);
    yield call(() => {
      window.location.reload();
    });
  } catch (error) {
    console.log([error]);
    yield put(logoutError(error));
  }
}

export function* emailVerifySaga({ payload }: PayloadAction<EmailVerifyActionPayload>): SagaIterator {
  try {
    yield call(AuthApi.verify, payload);
    yield put(emailVerifySuccess());
  } catch (error) {
    console.log([error]);
    yield put(emailVerifyError(error));
  }
}

export function* getAuthUserSaga(): SagaIterator {
  try {
    const authUser = yield call(AuthApi.getAuthUser);
    yield put(getAuthUserSuccess(authUser));
  } catch (error) {
    console.log([error]);
    yield put(getAuthUserError(error));
  }
}

export function* watchAuth() {
  yield takeLatest('auth/signUp', signUpSaga);
  yield takeLatest('auth/signIn', signInSaga);
  yield takeLatest('auth/logout', logoutSaga);
  yield takeLatest('auth/emailVerify', emailVerifySaga);
  yield takeLatest('auth/getAuthUser', getAuthUserSaga);
}
