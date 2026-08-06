import React from 'react'
import Message from './message'
import useGetMessages from '../../hooks/getMessages/useGetMessages'
import { useSelector } from 'react-redux';

function Messages() {
   useGetMessages()
  const {userMessages} = useSelector( (store) => store.message)
  //  console.log("Messages component rendered");
  //  console.log(userMessages)
    return (
      <div  className="flex-1 overflow-y-auto p-4 hide-scrollbar">
      {userMessages.map( (message) => {
        return(
        <Message key={message?._id} message={message}/>
        )

      })}
      
       
      </div>
    )
}

export default Messages
