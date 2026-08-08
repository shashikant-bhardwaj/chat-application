import { v2 as cloudinary } from "cloudinary"
import fs from "fs/promises"
import { ApiError } from "./ApiError.js"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        if (!response) {
            throw new ApiError(400, "something went wrong while uploading profile on cloudinary")
        }

        // file has been uploaded on cloudinary
        fs.unlink(localFilePath)
        return response

    } catch (error) {
         fs.unlink(localFilePath) // avoid throwing if file already gone
        return null
    }
}

export { uploadOnCloudinary }