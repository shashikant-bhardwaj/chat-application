import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import {
    userRegister,
    login,
    logout,
    getOtherUsers
     } from "../controllers/user.controller.js"


const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(login)

//secure routing
router.route("/logout").post(verifyJWT, logout)
router.route("/other-users").get(verifyJWT, getOtherUsers )


export default router