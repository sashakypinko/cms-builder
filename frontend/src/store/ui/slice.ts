import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UiState {
  successSnackbar: string;
  errorSnackbar: string;
  infoSnackbar: string;
}

const initialState: UiState = {
  successSnackbar: '',
  errorSnackbar: '',
  infoSnackbar: '',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showSuccessSnackbar: (state: UiState, { payload: successSnackbar }: PayloadAction<string>) => {
      state.successSnackbar = successSnackbar;
    },
    showErrorSnackbar: (state: UiState, { payload: errorSnackbar }: PayloadAction<string>) => {
      state.errorSnackbar = errorSnackbar;
    },
    showInfoSnackbar: (state: UiState, { payload: infoSnackbar }: PayloadAction<string>) => {
      state.infoSnackbar = infoSnackbar;
    },
    clearSnackbar: (state: UiState) => {
      state.successSnackbar = '';
      state.errorSnackbar = '';
      state.infoSnackbar = '';
    },
  },
});

export const { showSuccessSnackbar, showErrorSnackbar, showInfoSnackbar, clearSnackbar } = uiSlice.actions;

export default uiSlice.reducer;
