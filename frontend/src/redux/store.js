import {configureStore} from "@reduxjs/toolkit";
import {logger} from "redux-logger";

import {userReducer} from './usersSlice/index.js';

const store = configureStore({
    reducer: {
      //auth: combined reducer of all auth reducers should be passed here
      users:userReducer,
    },
    middleware: (getDefaultMiddlware) => {
      return getDefaultMiddlware().concat(logger);
    },
  });
  
  export default store;