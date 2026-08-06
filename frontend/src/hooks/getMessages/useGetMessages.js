import React, { useEffect } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { setMessages } from '../../features/message/messageSlice'

function useGetMessages() {

    const { selectedUser } = useSelector(store => store.user)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("Effect started");
        console.log("Selected User:", selectedUser._id);
        if (!selectedUser) return;
        const getMessages = async () => {
            console.log("API Calling");
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:8080/api/v1/messages/${selectedUser?._id}`)
                console.log("Response:", res.data.data.messages);
                dispatch(setMessages(res.data.data.messages))
                console.log("Dispatch done");

            } catch (error) {
                console.log(error.response);
    console.log(error.response.data);
    console.log(error.response.data.message);
            }

        }
        getMessages()
    }, [selectedUser])

}

export default useGetMessages
