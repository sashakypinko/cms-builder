import { all, takeEvery, fork } from 'redux-saga/effects';

import { LOGOUT_REQUEST, SIGN_IN_REQUEST, SIGN_UP_REQUEST, VERIFY_REQUEST } from '../actions/auth';

import { logout, signIn, signUp, verify } from './auth';
import { createLanguage, deleteLanguages, deleteTranslationKeys, getLanguages, updateLanguage } from './languages';
import {
  CREATE_LANGUAGE_REQUEST,
  DELETE_LANGUAGES_REQUEST,
  DELETE_TRANSLATION_KEYS_REQUEST,
  GET_LANGUAGES_REQUEST,
  UPDATE_LANGUAGE_REQUEST,
} from '../actions/languages';
import {
  ACTIVATE_USER_REQUEST,
  DEACTIVATE_USER_REQUEST,
  DELETE_USER_REQUEST,
  GET_USERS_REQUEST
} from '../actions/users';
import { activateUser, deactivateUser, deleteUser, getUsers } from './users';
import { notifications } from './notifications';



function * rootSaga () {
  yield all([
    notifications(),
    takeEvery(SIGN_UP_REQUEST, signUp),
    takeEvery(SIGN_IN_REQUEST, signIn),
    takeEvery(LOGOUT_REQUEST, logout),
    takeEvery(VERIFY_REQUEST, verify),
    takeEvery(GET_LANGUAGES_REQUEST, getLanguages),
    takeEvery(CREATE_LANGUAGE_REQUEST, createLanguage),
    takeEvery(UPDATE_LANGUAGE_REQUEST, updateLanguage),
    takeEvery(DELETE_LANGUAGES_REQUEST, deleteLanguages),
    takeEvery(DELETE_TRANSLATION_KEYS_REQUEST, deleteTranslationKeys),
    takeEvery(GET_USERS_REQUEST, getUsers),
    takeEvery(DELETE_USER_REQUEST, deleteUser),
    takeEvery(ACTIVATE_USER_REQUEST, activateUser),
    takeEvery(DEACTIVATE_USER_REQUEST, deactivateUser),
  ]);
}

export default rootSaga;
