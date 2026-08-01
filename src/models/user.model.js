import mongoose, { Schema, model } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
       fullName: {
        type: String,
        required: true
       },
       username: {
        type: String,
        required: true,
        unique: true
       },
       password: {
        type: String,
        required: true
       },
       profilePhoto:{
        type: String,
        default: ""
       },
       gender: {
        type: String,
        enum: ["male", "female"],
        required: true
       }
    }, 
    {timestamps: true})

// middlewares

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return null 
   this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAcessToken = async function() {
   
    return jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
           expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    
}

userSchema.methods.generatRefreshToken = async function() {
   
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
           expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}

export const User = model("User", userSchema)
