import React from "react";
import { FcSearch } from "react-icons/fc";
import OtherUsers from "./otherUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useSelector } from "react-redux";


function Sidebar({ selectedUser, setSelectedUser }) {

   const navigate = useNavigate()
  //  const selector = useSelector()

   //get authUser from store

   

  const logoutHandler = async() => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post("http://localhost:8080/api/v1/users/logout")
      navigate("/login")
      toast.success(res.data.message)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  //  const users = [
  //     { id: 1, name: "Ankit", online: true },
  //     { id: 2, name: "Rahul", online: false },
  //     { id: 3, name: "Priya", online: true },
  //     { id: 4, name: "Aman", online: false },
  //   ];

  return (
    <div className="h-full flex flex-col bg-white/5">

      {/* Header */}
      <div className=" p-4 border-b border-gray-700">

        <h1 className="text-2xl font-bold text-white">
          Chats
        </h1>

        <input
          type="text"
          placeholder="Search..."
          className="relative mt-4 w-full rounded-lg bg-white/10 border border-gray-600 px-4 py-2 text-white outline-none"
        />

      </div>

      {/* Users */}
      <OtherUsers setSelectedUser={setSelectedUser}
                  selectedUser={selectedUser}
    />

    
{/* Logged In User + Logout */}
<div className="border-t border-gray-700 p-3 sm:p-4">

  <div className="flex items-center justify-between gap-3">

    {/* Logged In User */}
    <div className="flex items-center gap-3 min-w-0">

      <img
        src="https://avatar.iran.liara.run/public/boy"
        alt="profile"
        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
      />

      <div className="min-w-0">
        <h3 className="text-white font-semibold text-sm sm:text-base truncate">
          Shashikant
        </h3>

        <p className="text-green-400 text-xs sm:text-sm">
          Online
        </p>
      </div>

    </div>

    {/* Logout Button */}
    <button onClick={logoutHandler}
      className="bg-red-600 hover:bg-red-700 px-3 sm:px-4 py-2 rounded-lg text-white text-sm font-medium transition"
    >
      Logout
    </button>

  </div>

</div>



    </div>
  );
}

export default Sidebar;







// <div className="flex-1 overflow-y-auto hide-scrollbar">

//       {users.map((user) => (

//         <div
//           key={user.id}
//           onClick={() => setSelectedUser(user)}
//           className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer transition"
//         >

//           <img
//             src="https://avatar.iran.liara.run/public"
//             alt=""
//             className="w-12 h-12 rounded-full"
//           />

//           <div>

//             <h2 className="text-white font-semibold">
//               {user.name}
//             </h2>

//             <p className="text-sm text-gray-400">
//               {user.online ? "Online" : "Offline"}
//             </p>

//           </div>

//         </div>

//       ))}

//     </div>