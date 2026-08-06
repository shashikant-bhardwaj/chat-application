import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    userMessages : []
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.userMessages = action.payload
        }
    }
})

export const { setMessages } =  messageSlice.actions
export default messageSlice.reducer