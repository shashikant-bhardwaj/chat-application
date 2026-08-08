import { Router } from "express"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
import {
    userRegister,
    login,
    logout,
    getOtherUsers,
    getCurrentUser,
    uploadProfilePhoto,

     } from "../controllers/user.controller.js"


const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(login)

//secure routing
router.route("/logout").post(verifyJWT, logout)
router.route("/").get(verifyJWT, getOtherUsers )
router.route("/current-user").get(verifyJWT, getCurrentUser )
router.route("/upload-profile").post(verifyJWT, upload.single("profilePhoto") , uploadProfilePhoto)


export default router