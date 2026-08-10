
import { useEffect } from "react"
import io from "socket.io-client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import Signup from "./components/Signup/Signup.jsx"
import Login from "./components/Login/Login.jsx"
import Home from "./components/Home/Home.jsx"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setOnlineUsers } from "./features/user/userSlice.js"
import { setAddMessages } from "./features/message/messageSlice.js"


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/register",
        element: <Signup />
    },
    {
        path: "/login",
        element: <Login />
    }
])


function App() {

  const {authUser, selectedUser} = useSelector(store => store.user)
  const dispatch = useDispatch()
 useEffect(() => {

    if (!authUser?._id) return

    const socket = io("http://localhost:8080")

    socket.on("connect", () => {

        console.log("Connected:", socket.id)

        socket.emit("addUser", authUser._id)

    })
    socket.on("getOnlineUsers", (onlineUsers) => {
        console.log("ONLINE USERS:", onlineUsers)
        dispatch(setOnlineUsers(onlineUsers))
    })
    socket.on("newMessage", (newMessage) => {
        if(newMessage?.senderId === selectedUser?._id){
                console.log("REAL TIME MESSAGE:", newMessage)
            dispatch(setAddMessages(newMessage))
        }
    })

    return () => {
        socket.disconnect()
    }

}, [authUser, selectedUser, dispatch])


    return (
        <RouterProvider router={router} />
    )
}


export default App

