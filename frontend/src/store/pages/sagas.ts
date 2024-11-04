import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { PageApi } from '../../services/api/page';
import {
  getPages,
  getPagesSuccess,
  getPagesError,
  createPageSuccess,
  createPageError,
  updatePageSuccess,
  updatePageError,
  deletePageSuccess,
  deletePageError,
} from './slice';
import { DeletePageActionPayload, PageActionPayload } from './types';

export function* getPagesSaga(): SagaIterator {
  try {
    const data = yield call(PageApi.getAll);
    yield put(getPagesSuccess(data));
  } catch (error) {
    console.log([error]);
    yield put(getPagesError(error));
  }
}

export function* createPageSaga({ payload }: PayloadAction<PageActionPayload>): SagaIterator {
  try {
    yield call(PageApi.create, payload.page);
    yield put(createPageSuccess());
    yield call(payload.onSuccess);
    yield put(getPages());
  } catch (error: any) {
    console.log([error]);
    yield put(createPageError(error));
    payload.onError(error?.response?.data || error?.data);
  }
}

export function* updatePageSaga({ payload }: PayloadAction<PageActionPayload>): SagaIterator {
  try {
    yield call(PageApi.update, payload.page);
    yield put(updatePageSuccess());
    yield call(payload.onSuccess);
    yield put(getPages());
  } catch (error: any) {
    console.log([error]);
    yield put(updatePageError(error));
    payload.onError(error?.response?.data || error?.data);
  }
}

export function* deletePageSaga({ payload }: PayloadAction<DeletePageActionPayload>): SagaIterator {
  try {
    yield call(PageApi.remove, payload.id);
    yield put(deletePageSuccess());
    yield call(payload.onSuccess);
    yield put(getPages());
  } catch (error) {
    console.log([error]);
    yield put(deletePageError(error));
    payload.onError(error);
  }
}

export function* watchPages() {
  yield takeLatest('pages/getPages', getPagesSaga);
  yield takeLatest('pages/createPage', createPageSaga);
  yield takeLatest('pages/updatePage', updatePageSaga);
  yield takeLatest('pages/deletePage', deletePageSaga);
}
