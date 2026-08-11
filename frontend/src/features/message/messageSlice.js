import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userMessages: [],
  selectedMessage: null,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.userMessages = action.payload;
    },
    setAddMessages: (state, action) => {
      state.userMessages.push(action.payload);
    },
    setSelectedMessage: (state, action) => {
      state.selectedMessage = action.payload;
    },
    setUpdatedMessages: (state, action) => {
      state.userMessages = state.userMessages.map((message) => {
        const updatedMessage = action.payload.find(
          (item) => item._id === message._id,
        );

        return updatedMessage || message;
      });
    },
    setDeletedMsg: (state, action) => {
      const message = state.userMessages.find(
        (message) => message._id === action.payload._id,
      );

      if (message) {
        message.deletedForEveryone = true;
      }
    },
  },
});

export const {
  setMessages,
  setSelectedMessage,
  setAddMessages,
  setUpdatedMessages,
  setDeletedMsg,
} = messageSlice.actions;
export default messageSlice.reducer;
