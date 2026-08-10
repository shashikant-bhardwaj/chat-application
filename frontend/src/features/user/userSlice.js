import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authUser: null,
    otherUsers: null,
    onlineUsers: [],
    selectedUser: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setAuthUser: (state, action) => {
            state.authUser = action.payload

        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload
        }
    }
})

export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers } = userSlice.actions
export default userSlice.reducer