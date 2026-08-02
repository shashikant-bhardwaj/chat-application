import express from "express"
import dotenv from "dotenv"
import { connectDB  } from "./db/index.js"
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
})
console.log("PORT:", process.env.PORT);
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);

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

