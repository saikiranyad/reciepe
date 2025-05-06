

const mongoose = require('mongoose');

const replySchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    replies:[]//replies using recursive functions
});

replySchema.add({replies:[replySchema]})

const commentSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    text:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    replies:[replySchema]
});


const reciepeSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    ingreidients:{
        type:String,
        required:true
    },
    images:{
        type:Array,
        required:true
    },
    likes:{
        type:Number,
        required:true,
        default:0
    },
    comments:[commentSchema],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
       
    },
    collabortors:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }],
     steps:{
            type:Array,
            default:[]
        },
   
   
    
   

},{timestamps:true})





const Reciepe = mongoose.model("Reciepe",reciepeSchema);

module.exports = Reciepe



