import { useState } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";

function Home() {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="h-screen p-2 sm:p-4">
      <div className="flex h-full rounded-xl overflow-hidden border border-gray-700 bg-white/10 backdrop-blur-md">

        {/* Sidebar */}
        <div
          className={`
            w-full
            md:w-80
            ${selectedUser ? "hidden md:block" : "block"}
          `}
        >
          <Sidebar
            setSelectedUser={setSelectedUser}
          />
        </div>

        {/* Message Container */}
        <div
          className={`
            flex-1
            ${selectedUser ? "block" : "hidden md:block"}
          `}
        >
          <MessageContainer
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        </div>

      </div>
    </div>
  );
}

export default Home;