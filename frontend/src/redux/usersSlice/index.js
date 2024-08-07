import { createSlice } from "@reduxjs/toolkit";

const initialState={
    users:[],
    status:'idle',
    error:null,
};

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{
        fetchUserSuccess: (state,action)=>{
            state.users = action.payload;
            state.status = 'succeeded';
        },
        fetchUsersFailure: (state, action) => {
            state.error = action.payload;
            state.status = 'failed';
          },
          addUser: (state, action) => {
            state.users.push(action.payload);
          },
          removeUser: (state, action) => {
            state.users = state.users.filter(user => user._id !== action.payload);
          },
    }
});

//action creaters
export const { fetchUserSuccess, fetchUsersFailure, addUser, removeUser } = userSlice.actions;

//export combined reducer
export const userReducer = userSlice.reducer;