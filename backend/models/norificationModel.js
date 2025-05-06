const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema({
    message:{
        type:String
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    from:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    typeofnotification:{
        type:String,
        enum:['like','comment','newreciepe','reply'],
        required:true
    },
    reciepe:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reciepe'
    },
    read:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }

})

const Notification = mongoose.model('Notification',NotificationSchema);
module.exports = Notification