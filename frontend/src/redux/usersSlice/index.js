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
        fetchUserSuccess: (state,payload)=>{
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

export const { fetchUsersSuccess, fetchUsersFailure, addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;