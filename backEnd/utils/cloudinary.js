import {v2 as cloudinary} from cloudinary;
const fs = require('fs');

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try{
    if (!localFilePath) return console.log("Err in file path");
    //UPLOAD FILE TO CLOUDINARY
    const response = await cloudinary.v2.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    console.log("File has been uploaded to cloudinary successfully", response.url);
    return response;
  } catch (err){
    fs.unlinkSync(localFilePath); // unlinks/removes the locally save file on the server as the upload got failed
    return null;
  } 
}