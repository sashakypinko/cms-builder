import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILanguage } from '../../services/api/language/dto/language.dto';
import {
  DeleteLanguagesActionPayload,
  DeleteTranslationKeysActionPayload,
  LanguageActionPayload,
  LanguagesState,
} from './types';

const initialState: LanguagesState = {
  languages: [],
  loading: false,
  error: null,
};

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    getLanguages: (state: LanguagesState) => {
      state.loading = true;
      state.error = null;
    },
    getLanguagesSuccess: (state: LanguagesState, { payload: languages }: PayloadAction<ILanguage[]>) => {
      state.loading = false;
      state.languages = languages;
    },
    getLanguagesError: (state: LanguagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    createLanguage: (state: LanguagesState, action: PayloadAction<LanguageActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createLanguageSuccess: (state: LanguagesState) => {
      state.loading = false;
    },
    createLanguageError: (state: LanguagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    updateLanguage: (state: LanguagesState, action: PayloadAction<LanguageActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updateLanguageSuccess: (state: LanguagesState) => {
      state.loading = false;
    },
    updateLanguageError: (state: LanguagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    deleteLanguage: (state: LanguagesState, action: PayloadAction<DeleteLanguagesActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    deleteLanguageSuccess: (state: LanguagesState) => {
      state.loading = false;
    },
    deleteLanguageError: (state: LanguagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    deleteTranslationKeys: (state: LanguagesState, action: PayloadAction<DeleteTranslationKeysActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    deleteTranslationKeysSuccess: (state: LanguagesState) => {
      state.loading = false;
    },
    deleteTranslationKeysError: (state: LanguagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getLanguages,
  getLanguagesSuccess,
  getLanguagesError,
  createLanguage,
  createLanguageSuccess,
  createLanguageError,
  updateLanguage,
  updateLanguageSuccess,
  updateLanguageError,
  deleteLanguage,
  deleteLanguageSuccess,
  deleteLanguageError,
  deleteTranslationKeys,
  deleteTranslationKeysSuccess,
  deleteTranslationKeysError,
} = languagesSlice.actions;

export default languagesSlice.reducer;
