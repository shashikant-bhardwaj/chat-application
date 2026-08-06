import React from 'react'
import Message from './message'

function Messages() {
    return (
      <div  className="flex-1 overflow-y-auto p-4 hide-scrollbar">
        <Message/>
        <Message/>
        <Message/>
      </div>
    )
}

export default Messages
