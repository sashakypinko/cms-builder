import { call, put } from 'redux-saga/effects';
import {
  createLanguageError,
  createLanguageSuccess,
  deleteLanguageError,
  deleteLanguageSuccess,
  deleteTranslationKeysError,
  deleteTranslationKeysSuccess,
  getLanguages as getLanguagesAction,
  getLanguagesError,
  getLanguagesSuccess,
  updateLanguageError,
  updateLanguageSuccess,
} from '../actions/languages'
import { LanguageApi } from '../../services/api/language';
import parseLanguagesResponse from '../utils/parse-languages-response.util';
import prepareLanguagesRequest from '../utils/prepare-languages-request.util';
import type Action from '../actions/action.interface';
import { type SagaIterator } from 'redux-saga';

export function* getLanguages(): SagaIterator {
  try {
    const data = yield call(LanguageApi.getAll);
    yield put(getLanguagesSuccess(parseLanguagesResponse(data)));
  } catch (error) {
    console.log([error]);
    yield put(getLanguagesError(error));
  }
}

export function* createLanguage({ payload, meta }: Action): SagaIterator {
  try {
    yield call(LanguageApi.create, prepareLanguagesRequest(payload));
    yield put(createLanguageSuccess());
    yield call(meta.onSuccess);
    yield put(getLanguagesAction());
  } catch (error: any) {
    console.log([error]);
    yield put(createLanguageError(error));
    meta.onError(error?.response?.data || error?.data);
  }
}

export function* updateLanguage({ payload, meta }: Action): SagaIterator {
  try {
    yield call(LanguageApi.update, prepareLanguagesRequest(payload));
    yield put(updateLanguageSuccess());
    yield call(meta.onSuccess);
    yield put(getLanguagesAction());
  } catch (error: any) {
    console.log([error]);
    yield put(updateLanguageError(error));
    meta.onError(error?.response?.data || error?.data);
  }
}

export function* deleteLanguages({ payload, meta }: Action): SagaIterator {
  try {
    yield call(LanguageApi.deleteByIds, payload);
    yield put(deleteLanguageSuccess());
    yield call(meta.onSuccess);
    yield put(getLanguagesAction());
  } catch (error) {
    console.log([error]);
    yield put(deleteLanguageError(error));
    meta.onError();
  }
}

export function* deleteTranslationKeys({ payload, meta }: Action): SagaIterator {
  try {
    yield call(LanguageApi.deleteTranslationKeys, payload);
    yield put(deleteTranslationKeysSuccess());
    yield call(meta.onSuccess);
    yield put(getLanguagesAction());
  } catch (error) {
    console.log([error]);
    yield put(deleteTranslationKeysError(error));
    meta.onError();
  }
}
