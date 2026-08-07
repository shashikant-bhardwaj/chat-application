import axios from "axios"
import { useDispatch } from "react-redux"

import React from 'react'
import { useSelector } from "react-redux";
import { setMessages } from "../../features/message/messageSlice.js";

function UseDeleteForMe() {
    const dispatch = useDispatch();
    const {selectedMessage, userMessages} = useSelector(store => store.message)
    
    const deleteForMe = async() => {
        axios.defaults.withCredentials = true;
        await axios.post(`http://localhost:8080/api/v1/messages/delete-msg/${selectedMessage?._id}`)
        dispatch(setMessages(
            userMessages.filter(msg => msg?._id !== selectedMessage._id)
        ))
    }
    return {deleteForMe }

}

export default UseDeleteForMe
