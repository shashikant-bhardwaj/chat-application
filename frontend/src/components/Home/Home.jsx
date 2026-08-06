import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import axios from "axios"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Home() {
  // const [selectedUser, setSelectedUser] = useState(null);
  const {selectedUser} = useSelector(store => store.user)
  const dispatch = useDispatch();

  useEffect( () => {
    const getCurrentUser = async() => {
      const res = await axios.post
    }
  }, [dispatch])

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
            selectedUser={selectedUser}
           
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
          
          />
        </div>

      </div>
    </div>
  );
}

export default Home;