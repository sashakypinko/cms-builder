import {
  CREATE_LANGUAGE_FAILURE,
  CREATE_LANGUAGE_REQUEST,
  CREATE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGES_FAILURE,
  DELETE_LANGUAGES_REQUEST,
  DELETE_LANGUAGES_SUCCESS,
  GET_LANGUAGES_FAILURE,
  GET_LANGUAGES_REQUEST,
  GET_LANGUAGES_SUCCESS,
  UPDATE_LANGUAGE_FAILURE,
  UPDATE_LANGUAGE_REQUEST,
  UPDATE_LANGUAGE_SUCCESS,
  DELETE_TRANSLATION_KEYS_REQUEST,
  DELETE_TRANSLATION_KEYS_SUCCESS,
  DELETE_TRANSLATION_KEYS_FAILURE,
} from '../actions/languages';
import { LanguagesState } from '../init-state';
import type Action from '../actions/action.interface';

const languages = (state: App.Store.Languages = LanguagesState, { type, payload }: Action) => {
  switch (type) {
    case GET_LANGUAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: payload,
        loading: false,
        error: null,
      };

    case GET_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_LANGUAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case CREATE_LANGUAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case UPDATE_LANGUAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case UPDATE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UPDATE_LANGUAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_LANGUAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_LANGUAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_LANGUAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case DELETE_TRANSLATION_KEYS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case DELETE_TRANSLATION_KEYS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case DELETE_TRANSLATION_KEYS_FAILURE:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default languages;
