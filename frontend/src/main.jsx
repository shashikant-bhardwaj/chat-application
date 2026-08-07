import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Signup from './components/Signup/Signup.jsx'
import Login from './components/Login/Login.jsx'
import Home from './components/Home/Home.jsx'
import {Toaster} from "react-hot-toast"
import { Provider } from "react-redux"
import { store } from './app/store.js'
import Sidebar from './components/Home/sidebar.jsx'
import ProfilePage from "./components/Home/ProfilePage.jsx"

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home/>
    },
    {
      path: "/register",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/profile-photo",
      element: <ProfilePage/>
    },
    
  ])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <RouterProvider router = {router} />
   <Toaster/>
   </Provider>
  </StrictMode>,
)
