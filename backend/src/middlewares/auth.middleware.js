import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const  verifyJWT = asyncHandler(async(req, res, next) => {
try {
      console.log("COOKIES:", req.cookies);
     const accessToken = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

      console.log("ACCESS TOKEN:", accessToken);
     if(!accessToken){
      throw new ApiError(401, "unauthorized access")
     }
  
    const decodedToken = await jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    console.log("DECODED TOKEN:", decodedToken);
  
    const user = await User.findById(decodedToken._id).select("-password -refreshToken")
     console.log("USER:", user);
    if(!user){
      throw new ApiError(401, "unauthorized token access")
    }
  
    req.user = user
    next()
} catch (error) {
     console.log("VERIFY JWT ERROR:", error);
     throw new ApiError(401, error?.message || "invalid aaccess token")
  
}


})

export { verifyJWT }