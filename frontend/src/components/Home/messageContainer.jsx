import React from "react";
import SendInput from "./sendInput";
import Messages from "./messages";

function MessageContainer({
  selectedUser,
  setSelectedUser,
}) {

  if (!selectedUser) {
    return (
      <div className="hidden md:flex flex-1 items-center justify-center text-white">
        Select a conversation
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">

      {/* Header */}

      <div className="flex items-center gap-3 p-4 border-b border-gray-700">

        {/* Back Button */}

        <button
          onClick={() => setSelectedUser(null)}
          className="md:hidden text-white text-2xl"
        >
          ←
        </button>

        <img
          src={selectedUser.profilePhoto}
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>

          <h2 className="text-white font-semibold">
            {selectedUser.fullName}
          </h2>

          <p className="text-green-400 text-sm">
            Online
          </p>

        </div>

      </div>

      {/* Messages */}
      
        <Messages/>

      {/* Input */}
     
      <SendInput/>
     

    </div>
  );
}

export default MessageContainer;