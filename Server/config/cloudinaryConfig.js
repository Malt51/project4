const cloudinary = require("cloudinary").v2;
 
 //config
 cloudinary.config({ 
    cloud_name: process.env.cloudinary_name, 
    api_key: process.env.cloudinary_api_key,
    api_secret: process.env.CLOUDINARY_URL 
    
});

module.exports =  cloudinary