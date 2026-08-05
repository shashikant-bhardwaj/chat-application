import React, {useState} from 'react'
import { Link } from "react-router-dom"

function Login() {

  const [user, setUser] = useState({
    identifier: "",
    password: "",
  })

  const onChange = (e) => {
    const { name, value } = e.target
    setUser((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault()
    console.log(user)
    setUser({
      identifier: "",
      password: "",
    })
  }


  return (
    <>
      <div className="min-h-screen flex items-center justify-center ">
        <div className="w-full max-w-md  p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100">
          <h1 className="text-3xl font-bold text-center text-white">
            Log In
          </h1>
          <form
           onSubmit={onSubmitHandler}
           className="space-y-4">

            {/* Username or email --> identifier */}
            <div>
              <label className="block text-sm font-medium  text-white mb-1">
                Username/Email
              </label>
              <input
                onChange={onChange}
                name='identifier'
                value={user.identifier}
                type="text"
                placeholder="Enter your username or email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium  text-white mb-1">
                Password
              </label>
              <input
                onChange={onChange}
                name='password'
                value={user.password}
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Log In
            </button>

            {/* SignUp Link */}
            <p className="text-center text-sm text-white">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline font-medium">
                Sign up
              </Link>

            </p>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login
