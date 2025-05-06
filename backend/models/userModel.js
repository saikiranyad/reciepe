

const mongoose =require('mongoose');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
   
    reciepes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reciepe'
    }],
    savedReciepes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reciepe'
    }],
    avatar:{
        type:String,
        default:''
    },
    description:{
        type:String,
        default:''
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    followers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    likedreciepe:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reciepe',
        default:[]
    }],
    

},{timestamps:true})


const User = mongoose.model('User',userSchema);
module.exports = User