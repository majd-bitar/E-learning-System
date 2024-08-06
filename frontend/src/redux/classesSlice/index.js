import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classes: [], // List of classes
  currentClass: null, // The currently selected class
  status: 'idle',
  error: null,
};

const classSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    fetchClassesSuccess: (state, action) => {
      state.classes = action.payload;
      state.status = 'succeeded';
    },
    fetchClassesFailure: (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload;
    },
    enrollInClass: (state, action) => {
      if (state.currentClass) {
        state.currentClass.students.push(action.payload);
      }
    },
    // Add a reducer to handle fetching students of a specific class
    fetchStudentsSuccess: (state, action) => {
      if (state.currentClass) {
        state.currentClass.students = action.payload;
      }
    },
    fetchStudentsFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { 
  fetchClassesSuccess, 
  fetchClassesFailure, 
  setCurrentClass, 
  enrollInClass, 
  fetchStudentsSuccess, 
  fetchStudentsFailure 
} = classSlice.actions;
export default classSlice.reducer;
