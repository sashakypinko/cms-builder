import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { UserApi } from '../../services/api/user';
import {
  activateUserError,
  activateUserSuccess,
  deactivateUserError,
  deactivateUserSuccess,
  deleteUserError,
  deleteUserSuccess,
  getUsers,
  getUsersError,
  getUsersSuccess,
} from './slice';
import { PayloadAction } from '@reduxjs/toolkit';
import { UserActionPayload } from './types';

export function* getUsersSaga(): SagaIterator {
  try {
    const data = yield call(UserApi.getAll);
    yield put(getUsersSuccess(data));
  } catch (error) {
    console.log([error]);
    yield put(getUsersError(error));
  }
}

export function* deleteUserSaga({ payload }: PayloadAction<UserActionPayload>): SagaIterator {
  try {
    yield call(UserApi.deleteById, payload.id);
    yield put(deleteUserSuccess());
    yield call(payload.onSuccess);
    yield put(getUsers());
  } catch (error) {
    console.log([error]);
    yield put(deleteUserError(error));
    payload.onError(error);
  }
}

export function* activateUserSaga({ payload }: PayloadAction<UserActionPayload>): SagaIterator {
  try {
    yield call(UserApi.activate, payload.id);
    yield put(activateUserSuccess());
    yield call(payload.onSuccess);
    yield put(getUsers());
  } catch (error) {
    console.log([error]);
    yield put(activateUserError(error));
    payload.onError(activateUserError(error));
  }
}

export function* deactivateUserSaga({ payload }: PayloadAction<UserActionPayload>): SagaIterator {
  try {
    yield call(UserApi.deactivate, payload.id);
    yield put(deactivateUserSuccess());
    yield call(payload.onSuccess);
    yield put(getUsers());
  } catch (error) {
    console.log([error]);
    yield put(deactivateUserError(error));
    payload.onError(error);
  }
}

export function* watchUsers() {
  yield takeLatest('users/getUsers', getUsersSaga);
  yield takeLatest('users/deleteUser', deleteUserSaga);
  yield takeLatest('users/activateUser', activateUserSaga);
  yield takeLatest('users/deactivateUser', deactivateUserSaga);
}
