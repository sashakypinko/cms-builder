import { call, put } from 'redux-saga/effects';
import { AuthApi } from '../../services/api/auth';
import type Action from '../actions/action.interface';
import {
  logoutError,
  logoutSuccess,
  signInError,
  signInSuccess,
  signUpError,
  signUpSuccess, verifyError,
  verifySuccess
} from '../actions/auth';
import { AuthStorage } from '../../services/storage/auth.storage';
import { type SagaIterator } from 'redux-saga';

export function* signUp({ payload, meta }: Action): SagaIterator {
  try {
    const data = yield call(AuthApi.signUp, payload);
    yield put(signUpSuccess({ user: data.user }));
    meta.onSuccess();
  } catch (error: any) {
    console.log([error]);
    yield put(signUpError(error));
    meta.onError(error?.response?.data || error?.data);
  }
}

export function* signIn({ payload, meta }: Action): SagaIterator {
  try {
    const data = yield call(AuthApi.signIn, payload);
    yield put(signInSuccess({ user: data.user }));
    yield call(AuthStorage.storeUser, data.user);
    yield call(AuthStorage.storeAccessToken, data.accessToken);
    yield call(AuthStorage.storeRefreshToken, data.refreshToken);
    yield call(meta.onSuccess);
    yield call(() => {
      window.location.reload();
    });
  } catch (error: any) {
    console.log([error]);
    yield put(signInError(error));
    meta.onError(error?.response?.data || error?.data);
  }
}

export function* logout(): SagaIterator {
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

export function* verify({ payload }: Action): SagaIterator {
  try {
    yield call(AuthApi.verify, payload);
    yield put(verifySuccess());
  } catch (error) {
    console.log([error]);
    yield put(verifyError(error));
  }
}
