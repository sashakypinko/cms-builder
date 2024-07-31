import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { NotificationApi } from '../../services/api/notification';
import { PayloadAction } from '@reduxjs/toolkit';
import { ChangeNotificationViewedActionPayload, RemoveNotificationActionPayload } from './types';
import {
  getNotifications,
  getNotificationsError,
  getNotificationsSuccess,
  removeNotificationSuccess,
  removeNotificationError,
  changeNotificationViewedSuccess,
  changeNotificationViewedError,
} from './slice';

export function* getNotificationsSaga(): SagaIterator {
  try {
    const data = yield call(NotificationApi.getAll);
    yield put(getNotificationsSuccess(data));
  } catch (error) {
    console.log([error]);
    yield put(getNotificationsError(error));
  }
}

export function* removeNotificationSaga({ payload }: PayloadAction<RemoveNotificationActionPayload>): SagaIterator {
  try {
    yield call(NotificationApi.remove, payload);
    yield put(removeNotificationSuccess());
    yield put(getNotifications());
  } catch (error) {
    console.log([error]);
    yield put(removeNotificationError(error));
  }
}

export function* changeNotificationViewedSaga({
  payload,
}: PayloadAction<ChangeNotificationViewedActionPayload>): SagaIterator {
  try {
    yield call(NotificationApi.changeViewed, payload.id, payload.viewed);
    yield put(changeNotificationViewedSuccess());
    yield put(getNotifications());
  } catch (error) {
    console.log([error]);
    yield put(changeNotificationViewedError(error));
  }
}

export function* watchNotifications() {
  yield takeLatest('notifications/getNotifications', getNotificationsSaga);
  yield takeLatest('notifications/removeNotification', removeNotificationSaga);
  yield takeLatest('notifications/changeNotificationViewed', changeNotificationViewedSaga);
}
