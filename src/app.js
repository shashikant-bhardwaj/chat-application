import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// configuration

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())

// import router
import userRouter from "./routes/user.route.js"

// routing
app.use("/api/v1/users", userRouter)




export { app }