import React from 'react'

function Message({message}) {
 
    return (
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">

        <div key={message?.senderId} className="bg-gray-700 text-white rounded-xl p-3 w-fit">
          {message.message}
        </div>

        <div key={message?.receiverId} className="bg-blue-600 text-white rounded-xl p-3 w-fit ml-auto mt-3">
         {message.message}
        </div>

      </div>
    )
}

export default Message
