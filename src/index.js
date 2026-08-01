import express from "express"
import dotenv from "dotenv"
import { connectDB  } from "./db/index.js"

dotenv.config({
    path: "./env"
})
const app = express()
connectDB()
.then( () => {
    app.on("error", (error) => {
        console.log(`HTTP SERVER EVENT ERROR ${error}`)
        throw error
    })
    app.listen(process.env.PORT || 5000, () => {
        console.log(`server is running at port ${process.env.PORT || 5000}`)
    })
})
.catch( (error) => {
    console.log(`mongoDB connection failed!! ${error}`)
})

