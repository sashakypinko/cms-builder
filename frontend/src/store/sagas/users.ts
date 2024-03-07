import { call, put } from 'redux-saga/effects';
import { UserApi } from '../../services/api/user';
import type Action from '../actions/action.interface';
import { type SagaIterator } from 'redux-saga';
import {
  getUsers as getUsersAction,
  getUsersSuccess,
  getUsersError,
  deleteUserSuccess,
  deleteUserError,
  activateUserSuccess,
  activateUserError,
  deactivateUserSuccess,
  deactivateUserError
} from '../actions/users';

export function* getUsers(): SagaIterator {
  try {
    const data = yield call(UserApi.getAll);
    yield put(getUsersSuccess(data));
  } catch (error) {
    console.log([error]);
    yield put(getUsersError(error));
  }
}

export function* deleteUser({ payload, meta }: Action): SagaIterator {
  try {
    yield call(UserApi.deleteById, payload);
    yield put(deleteUserSuccess());
    yield call(meta.onSuccess);
    yield put(getUsersAction());
  } catch (error) {
    console.log([error]);
    yield put(deleteUserError(error));
    meta.onError();
  }
}

export function* activateUser({ payload, meta }: Action): SagaIterator {
  try {
    yield call(UserApi.activate, payload);
    yield put(activateUserSuccess());
    yield call(meta.onSuccess);
    yield put(getUsersAction());
  } catch (error) {
    console.log([error]);
    yield put(activateUserError(error));
    meta.onError();
  }
}

export function* deactivateUser({ payload, meta }: Action): SagaIterator {
  try {
    yield call(UserApi.deactivate, payload);
    yield put(deactivateUserSuccess());
    yield call(meta.onSuccess);
    yield put(getUsersAction());
  } catch (error) {
    console.log([error]);
    yield put(deactivateUserError(error));
    meta.onError();
  }
}
