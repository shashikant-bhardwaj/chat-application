import { v2 as cloudinary } from "cloudinary"
import fs from "fs"
import { ApiError } from "./ApiError"

cloudinary.config({

})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFieldPath) return null

        //upload file  on cloudinary

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        //file has been uploaded on cloudinary

        fs.unlink(localFilePath)
        return response;


    } catch (error) {
        fs.unlink(localFilePath)
        return null;
    }
}

export { uploadOnCloudinary }