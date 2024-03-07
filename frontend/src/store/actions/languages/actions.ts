import type Action from '../action.interface'
import {
  CREATE_LANGUAGE_FAILURE,
  CREATE_LANGUAGE_REQUEST,
  CREATE_LANGUAGE_SUCCESS,
  DELETE_LANGUAGES_FAILURE,
  DELETE_LANGUAGES_REQUEST,
  DELETE_LANGUAGES_SUCCESS,
  DELETE_TRANSLATION_KEYS_FAILURE,
  DELETE_TRANSLATION_KEYS_REQUEST,
  DELETE_TRANSLATION_KEYS_SUCCESS,
  GET_LANGUAGES_FAILURE,
  GET_LANGUAGES_REQUEST,
  GET_LANGUAGES_SUCCESS,
  UPDATE_LANGUAGE_FAILURE,
  UPDATE_LANGUAGE_REQUEST,
  UPDATE_LANGUAGE_SUCCESS,
} from './action-types'
import { type ILanguage } from '../../../services/api/language/dto/language.dto'
import { type ActionCreatorWithMeta } from '../action-creator-types'

export const getLanguages = (): Action => ({
  type: GET_LANGUAGES_REQUEST,
})

export const getLanguagesSuccess = (responseData: ILanguage[]): Action => ({
  type: GET_LANGUAGES_SUCCESS,
  payload: responseData,
})

export const getLanguagesError = (error: any): Action => ({
  type: GET_LANGUAGES_FAILURE,
  payload: error,
})

export const createLanguage: ActionCreatorWithMeta = (
  language: ILanguage,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: CREATE_LANGUAGE_REQUEST,
  payload: language,
  meta: {
    onSuccess,
    onError,
  },
})

export const createLanguageSuccess = (): Action => ({
  type: CREATE_LANGUAGE_SUCCESS,
})

export const createLanguageError = (error: any): Action => ({
  type: CREATE_LANGUAGE_FAILURE,
  payload: error,
})

export const updateLanguage: ActionCreatorWithMeta = (
  language: ILanguage,
  onSuccess: () => void,
  onError: (errors: any) => void,
): Action => ({
  type: UPDATE_LANGUAGE_REQUEST,
  payload: language,
  meta: {
    onSuccess,
    onError,
  },
})

export const updateLanguageSuccess = (): Action => ({
  type: UPDATE_LANGUAGE_SUCCESS,
})

export const updateLanguageError = (error: any): Action => ({
  type: UPDATE_LANGUAGE_FAILURE,
  payload: error,
})

/* eslint-disable @typescript-eslint/no-empty-function */
export const deleteLanguages: ActionCreatorWithMeta = (ids: Array<string | undefined>, onSuccess = () => {
}, onError = () => {
}): Action => ({
  type: DELETE_LANGUAGES_REQUEST,
  payload: ids,
  meta: {
    onSuccess,
    onError,
  },
})

export const deleteLanguageSuccess = (): Action => ({
  type: DELETE_LANGUAGES_SUCCESS,
})

export const deleteLanguageError = (error: any): Action => ({
  type: DELETE_LANGUAGES_FAILURE,
  payload: error,
})

export const deleteTranslationKeys: ActionCreatorWithMeta = (keys: Array<string>, onSuccess = () => {
}, onError = () => {
}): Action => ({
  type: DELETE_TRANSLATION_KEYS_REQUEST,
  payload: keys,
  meta: {
    onSuccess,
    onError,
  },
})

export const deleteTranslationKeysSuccess = (): Action => ({
  type: DELETE_TRANSLATION_KEYS_SUCCESS,
})

export const deleteTranslationKeysError = (error: any): Action => ({
  type: DELETE_TRANSLATION_KEYS_FAILURE,
  payload: error,
})

