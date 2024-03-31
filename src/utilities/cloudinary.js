import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOncloudinary = async function (localfilepath) {
    try {
        if (!localfilepath) {
            console.error("filenotfound")
            return null;
        }
        // if file path is not found

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto"
        })
        // file uploaded successfully
        console.log("file uploaded successfully", response.url)
        return response.url;


    }
    catch (error) {
        fs.unlinkSync(localfilepath)
        // to remove file from local database
    }


    export { uploadOncloudinary }






