const cloudinary = require("../utils/cloudinary")
const uploadtocloudinary = async(filepath)=>{
    try{
        const result = await cloudinary.uploader.upload(filepath);
        return {
            urlid:result.public_id,
            imageurl:result.secure_url
        }


    }catch(err){
       console.log(err)
    }
}

module.exports = {uploadtocloudinary}