import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    userRegister,
    login,
    logout,
    getOtherUsers,
    getCurrentUser,

     } from "../controllers/user.controller.js"


const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(login)

//secure routing
router.route("/logout").post(verifyJWT, logout)
router.route("/").get(verifyJWT, getOtherUsers )
router.route("/current-user").get(verifyJWT, getCurrentUser )


export default router