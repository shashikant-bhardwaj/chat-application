import { Router } from "express"
import {
    sendMessage,
    getMessage
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/send/:_id").post(verifyJWT, sendMessage)
router.route("/:_id").get(verifyJWT, getMessage)


export default router