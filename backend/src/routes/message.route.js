import { Router } from "express"
import {
    sendMessage,
    getMessage,
    markMessageAsSeen,
    deleteForMe
} from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/send/:_id").post(verifyJWT, sendMessage)
router.route("/:_id").get(verifyJWT, getMessage)
router.route("/seen/:_id").patch(verifyJWT, markMessageAsSeen)
router.route("/delete-msg/:_id").post(verifyJWT, deleteForMe)


export default router