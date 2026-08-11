import axios from "axios";
import { useEffect } from "react";
import io from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Signup from "./components/Signup/Signup.jsx";
import Login from "./components/Login/Login.jsx";
import Home from "./components/Home/Home.jsx";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setOnlineUsers } from "./features/user/userSlice.js";
import {
  setAddMessages,
  setDeletedMsg,
  setUpdatedMessages,
} from "./features/message/messageSlice.js";
import updateProfile from "./components/Home/updateProfile.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  const { authUser, selectedUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser?._id) return;

    const socket = io("http://localhost:8080");

    socket.on("connect", () => {
      console.log("Connected:", socket.id);

      socket.emit("addUser", authUser._id);
    });
    socket.on("getOnlineUsers", (onlineUsers) => {
      console.log("ONLINE USERS:", onlineUsers);
      dispatch(setOnlineUsers(onlineUsers));
    });
    socket.on("newMessage", async (newMessage) => {
      if (newMessage?.senderId === selectedUser?._id) {
        console.log("REAL TIME MESSAGE:", newMessage);

        // message UI mein add karo
        dispatch(setAddMessages(newMessage));

        // kyunki chat already open hai,
        // message ko immediately seen kar do
        try {
          await axios.patch(
            `http://localhost:8080/api/v1/messages/seen/${newMessage.senderId}`,
            {},
            {
              withCredentials: true,
            },
          );

          console.log("New message immediately seen");
        } catch (error) {
          console.log(
            "MARK AS SEEN ERROR:",
            error.response?.data || error.message,
          );
        }
      }
    });
    socket.on("updatedMessages", (updatedMessages) => {
      dispatch(setUpdatedMessages(updatedMessages));
    });
    socket.on("deleteMsg", (deleteMsg) => {
      console.log("DELETE EVENT RECEIVED:", deleteMsg);
      dispatch(setDeletedMsg(deleteMsg))
    })

    return () => {
      socket.disconnect();
    };
  }, [authUser, selectedUser, dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
