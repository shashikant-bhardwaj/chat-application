import React, {useState} from 'react'
import useSendMessage  from '../../hooks/sendMessage/useSendMessage'



function SendInput() {
  const[message, setMessage] = useState("")
  const { send, loading } = useSendMessage()

  const handleSend = () => {
    if(!message?.trim()) return
    send(message)
    setMessage("")
  }

  const handleKeyDown = (e) => {
    if(e.key === "Enter"){
      handleSend()
    }
  }
    return (
         <div className="border-t border-gray-700 p-3">

        <div className="flex gap-2">

          <input 
            onKeyDown={handleKeyDown}
            value={message}
            onChange={ (e) => setMessage(e.target.value)}
            className="flex-1 rounded-full px-4 py-3 bg-white/10 border border-gray-600 text-white outline-none"
            placeholder="Type a message..."
          />

          <button onClick={handleSend} disabled={loading} className="bg-blue-600 px-5 rounded-full text-white">
            {loading ? "...sending" : "send"}
          </button>

        </div>

      </div>
    )
}

export default SendInput
