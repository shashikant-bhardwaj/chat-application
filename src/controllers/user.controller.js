import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"



const userRegister = asyncHandler( async(req, res) => {
//get details from frontend
//validation
//find if user already exist 
// create user and entry in db 
//check user
// send res

const {fullName, username, email, password, gender} = req.body

if ([fullName, username, email, password, gender].some( (field) => 
      field?.trim() === "")) {
    throw new ApiError(400, "All fields are required")
}

const existedUser = await User.findOne(
    {
        $or: [{username}, {fullName}]
    }
)

if (existedUser) {
    throw new ApiError(400, "user already exist with this username")
}

const boyProfile = "https://avatarapi.runflare.run/public/boy"
const girlProfile = "https://avatarapi.runflare.run/public/girl"

const user = await User.create(
    {
        fullName,
        email,
        username,
        password,
        profilePhoto: gender == "male" ? boyProfile : girlProfile,
        gender
    }
)

 const createdUser = await User.findById(user._id).select("-password")

 if(!createdUser){
    throw new ApiError(500, "someting went wrong while registering user")
 }

 return res.
 status(200)
 .json(
    new ApiResponse(200, createdUser, "user is registered successfully")
 )

})



export {
    userRegister
}