import React from 'react'
import { useSelector } from 'react-redux'

function Message({message, onMessageClick, onMessageLongPress}) {
  const {authUser , selectedUser} = useSelector(store => store.user)
 console.log(message)
console.log("deletedForEveryone:", message.deletedForEveryone)
  
  const isSender = message.senderId ===  authUser._id
  const isReceiver = message.receiverId === selectedUser._id

  let timer;

  const handleTouchStart = () => {
    timer = setTimeout(() => {
      onMessageLongPress(message)
    },500)
  }
  const handleTouchEnd = () => {
    clearTimeout(timer)
  }
 
  return (
    <div className={`chat ${isSender ? "chat-end" : "chat-start"}`}>
      <div
      onContextMenu={(e) => {
        e.preventDefault();
        onMessageClick(message)
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
        className={`rounded-xl p-3 w-fit ${
          isSender ? "bg-blue-600 text-white ml-auto" : "bg-gray-700 text-white"
        } ${message.deletedForEveryone? "bg-gray-800" : ""}`}
      >
        {message.deletedForEveryone ? (
                    <div className="text-gray-300  italic">
                        This message was deleted
                    </div>
                ) : (
                    <div>
                        {message.message}
                    </div>
                )}
      </div>
    </div>
  )
}


export default Message
