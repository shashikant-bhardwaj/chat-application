import { createSlice } from "@reduxjs/toolkit";

const initialState =  {
    userMessages : [],
    selectedMessage: null
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.userMessages = action.payload
        },
        setAddMessages: (state, action) => {
            state.userMessages.push(action.payload)
        },
        setSelectedMessage: (state, action) => {
            state.selectedMessage = action.payload
        }
    }
})

export const { setMessages , setSelectedMessage, setAddMessages} =  messageSlice.actions
export default messageSlice.reducer