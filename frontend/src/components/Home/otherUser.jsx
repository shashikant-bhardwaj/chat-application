import React from 'react'


function OtherUser({setSelectedUser, user}) {
     
  
    return (

          <div
            // key={user.id}
            onClick={() => setSelectedUser(user)}
            className="flex items-center gap-3 p-4 hover:bg-white/10 cursor-pointer transition"
          >

            <img
              src={ user.profilePhoto}
              alt=""
              className="w-12 h-12 rounded-full"
            />

            <div>

              <h2 className="text-white font-semibold">
                {user.fullName}
              </h2>

              <p className="text-sm text-gray-400">
                {user.online ? "Online" : "Offline"}
              </p>

            </div>

          </div>

        
    )
}

export default OtherUser
