import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setMessages } from "../../features/message/messageSlice"

function useSendMessage(){
  const dispatch = useDispatch()
    const {selectedUser} = useSelector(store => store.user)
    const {userMessages} = useSelector(store => store.message)
    const [loading, setloading] = useState(false);
    const send = async(message) => {
      try {
        setloading(true);
          axios.defaults.withCredentials = true;
        const res = await axios.post(`http://localhost:8080/api/v1/messages/send/${selectedUser?._id}`, {message})
        if(!res) return;
        dispatch(setMessages([...userMessages, res.data.data]))
        
       
      } catch (error) {
        console.log(error.response.data)
      }finally{
        setloading(false)
      }
        
    }
    return {send, loading}
}

export default useSendMessage;
