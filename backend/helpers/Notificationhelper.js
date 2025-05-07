const Notification = require("../models/norificationModel")


const sendnotification = async(touserid,fromuserid,typeofnotification,recipeid)=>{
    try{
        const messages = {
            newreciepe:"posted new recipe",
            like:"like the post",
            comment:"comment on your post",
            follow:"user following you",
            
        }
        const newNotification = new Notification({
            to:touserid,
            from:fromuserid,
            typeofnotification,
            message:messages[typeofnotification],
            reciepe:recipeid
        })
        await newNotification.save();
        // console.log(newNotification)


    }catch(err){
        console.log(err)
    }
}

module.exports = {sendnotification}