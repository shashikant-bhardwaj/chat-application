import React from "react";

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
          src="https://avatar.iran.liara.run/public"
          alt=""
          className="w-12 h-12 rounded-full"
        />

        <div>

          <h2 className="text-white font-semibold">
            {selectedUser.name}
          </h2>

          <p className="text-green-400 text-sm">
            Online
          </p>

        </div>

      </div>

      {/* Messages */}

      <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">

        <div className="bg-gray-700 text-white rounded-xl p-3 w-fit">
          Hello 👋
        </div>

        <div className="bg-blue-600 text-white rounded-xl p-3 w-fit ml-auto mt-3">
          Hi 😊
        </div>

      </div>

      {/* Input */}

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

    </div>
  );
}

export default MessageContainer;