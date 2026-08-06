import React from 'react'

function Message() {
    return (
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">

        <div className="bg-gray-700 text-white rounded-xl p-3 w-fit">
          Hello 👋
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-3 w-fit ml-auto mt-3">
          Hi 😊
        </div>

      </div>
    )
}

export default Message
