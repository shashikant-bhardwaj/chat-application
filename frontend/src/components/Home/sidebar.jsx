import React from "react";

function Sidebar({ setSelectedUser }) {

  const users = [
    { id: 1, name: "Ankit", online: true },
    { id: 2, name: "Rahul", online: false },
    { id: 3, name: "Priya", online: true },
    { id: 4, name: "Aman", online: false },
  ];

  return (
    <div className="h-full flex flex-col bg-white/5">

      {/* Header */}
      <div className="p-4 border-b border-gray-700">

        <h1 className="text-2xl font-bold text-white">
          Chats
        </h1>

        <input
          type="text"
          placeholder="Search..."
          className="mt-4 w-full rounded-lg bg-white/10 border border-gray-600 px-4 py-2 text-white outline-none"
        />

      </div>

      {/* Users */}

      <div className="flex-1 overflow-y-auto hide-scrollbar">

        {users.map((user) => (

          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer transition"
          >

            <img
              src="https://avatar.iran.liara.run/public"
              alt=""
              className="w-12 h-12 rounded-full"
            />

            <div>

              <h2 className="text-white font-semibold">
                {user.name}
              </h2>

              <p className="text-sm text-gray-400">
                {user.online ? "Online" : "Offline"}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Sidebar;