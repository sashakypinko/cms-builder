import { call, put, takeLatest } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { LanguageApi } from '../../services/api/language';
import {
  createLanguageError,
  createLanguageSuccess,
  deleteLanguageError,
  deleteLanguageSuccess,
  deleteTranslationKeysError,
  deleteTranslationKeysSuccess,
  getLanguages,
  getLanguagesError,
  getLanguagesSuccess,
  updateLanguageError,
  updateLanguageSuccess,
} from './slice';
import parseLanguagesResponse from '../utils/parse-languages-response.util';
import prepareLanguagesRequest from '../utils/prepare-languages-request.util';
import { DeleteLanguagesActionPayload, DeleteTranslationKeysActionPayload, LanguageActionPayload } from './types';

export function* getLanguagesSaga(): SagaIterator {
  try {
    const data = yield call(LanguageApi.getAll);
    yield put(getLanguagesSuccess(parseLanguagesResponse(data)));
  } catch (error) {
    console.log([error]);
    yield put(getLanguagesError(error));
  }
}

export function* createLanguageSaga({ payload }: PayloadAction<LanguageActionPayload>): SagaIterator {
  try {
    yield call(LanguageApi.create, prepareLanguagesRequest(payload.language));
    yield put(createLanguageSuccess());
    yield call(payload.onSuccess);
    yield put(getLanguages());
  } catch (error: any) {
    console.log([error]);
    yield put(createLanguageError(error));
    payload.onError(error?.response?.data || error?.data);
  }
}

export function* updateLanguageSaga({ payload }: PayloadAction<LanguageActionPayload>): SagaIterator {
  try {
    yield call(LanguageApi.update, prepareLanguagesRequest(payload.language));
    yield put(updateLanguageSuccess());
    yield call(payload.onSuccess);
    yield put(getLanguages());
  } catch (error: any) {
    console.log([error]);
    yield put(updateLanguageError(error));
    payload.onError(error?.response?.data || error?.data);
  }
}

export function* deleteLanguagesSaga({ payload }: PayloadAction<DeleteLanguagesActionPayload>): SagaIterator {
  try {
    yield call(LanguageApi.deleteByIds, payload.ids);
    yield put(deleteLanguageSuccess());
    yield call(payload.onSuccess);
    yield put(getLanguages());
  } catch (error) {
    console.log([error]);
    yield put(deleteLanguageError(error));
    payload.onError(error);
  }
}

export function* deleteTranslationKeysSaga({
  payload,
}: PayloadAction<DeleteTranslationKeysActionPayload>): SagaIterator {
  try {
    yield call(LanguageApi.deleteTranslationKeys, payload.keys);
    yield put(deleteTranslationKeysSuccess());
    yield call(payload.onSuccess);
    yield put(getLanguages());
  } catch (error) {
    console.log([error]);
    yield put(deleteTranslationKeysError(error));
    payload.onError(error);
  }
}

export function* watchLanguages() {
  yield takeLatest('languages/getLanguages', getLanguagesSaga);
  yield takeLatest('languages/createLanguage', createLanguageSaga);
  yield takeLatest('languages/updateLanguage', updateLanguageSaga);
  yield takeLatest('languages/deleteLanguage', deleteLanguagesSaga);
  yield takeLatest('languages/deleteTranslationKeys', deleteTranslationKeysSaga);
}
