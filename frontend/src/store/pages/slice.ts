import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  DeletePageActionPayload,
  PageActionPayload,
  PagesState,
} from './types';
import {IPage} from '../../services/api/page/dto/page.dto';

const initialState: PagesState = {
  pages: [],
  loading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    getPages: (state: PagesState) => {
      state.loading = true;
      state.error = null;
    },
    getPagesSuccess: (state: PagesState, { payload: pages }: PayloadAction<IPage[]>) => {
      state.loading = false;
      state.pages = pages;
    },
    getPagesError: (state: PagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    createPage: (state: PagesState, action: PayloadAction<PageActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    createPageSuccess: (state: PagesState) => {
      state.loading = false;
    },
    createPageError: (state: PagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    updatePage: (state: PagesState, action: PayloadAction<PageActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    updatePageSuccess: (state: PagesState) => {
      state.loading = false;
    },
    updatePageError: (state: PagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
    deletePage: (state: PagesState, action: PayloadAction<DeletePageActionPayload>) => {
      state.loading = true;
      state.error = null;
    },
    deletePageSuccess: (state: PagesState) => {
      state.loading = false;
    },
    deletePageError: (state: PagesState, { payload: error }: PayloadAction<any>) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export const {
  getPages,
  getPagesSuccess,
  getPagesError,
  createPage,
  createPageSuccess,
  createPageError,
  updatePage,
  updatePageSuccess,
  updatePageError,
  deletePage,
  deletePageSuccess,
  deletePageError,
} = pagesSlice.actions;

export default pagesSlice.reducer;
