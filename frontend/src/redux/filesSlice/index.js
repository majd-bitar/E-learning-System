import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  files: [], // List of files
  status: 'idle',
  error: null,
};

const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    fetchFilesSuccess: (state, action) => {
      state.files = action.payload;
      state.status = 'succeeded';
    },
    fetchFilesFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    downloadFileSuccess: (state, action) => {
      // Handle file download state if needed
    },
  },
});

export const { fetchFilesSuccess, fetchFilesFailure, downloadFileSuccess } = fileSlice.actions;
export default fileSlice.reducer;
