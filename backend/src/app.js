import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()


app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

// import uesr router
import userRouter from "./routes/user.route.js"

// import message router
import messageRouter from "./routes/message.route.js"

// routing
app.use("/api/v1/users", userRouter)
app.use("/api/v1/messages", messageRouter)



app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "internal server error"
    });
});




export { app }