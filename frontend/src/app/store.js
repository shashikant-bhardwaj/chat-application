import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice.js";
import messageReducer from "../features/message/messageSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});

export { store };
