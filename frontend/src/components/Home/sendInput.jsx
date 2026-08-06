import React from 'react'

function SendInput() {
    return (
         <div className="border-t border-gray-700 p-3">

        <div className="flex gap-2">

          <input
            className="flex-1 rounded-full px-4 py-3 bg-white/10 border border-gray-600 text-white outline-none"
            placeholder="Type a message..."
          />

          <button className="bg-blue-600 px-5 rounded-full text-white">
            Send
          </button>

        </div>

      </div>
    )
}

export default SendInput
