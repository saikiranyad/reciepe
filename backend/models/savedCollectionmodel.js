const mongoose = require("mongoose")


const savedcollectionschema = mongoose.Schema({
    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    reciepeData:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reciepe'
    }],
    name:{
        type:String,
        required:true
    }
},{timestamps:true})

savedcollectionschema.index({user:1,name:1},{unique:true})

const savedCollection = mongoose.model('savedCollection',savedcollectionschema)
module.exports = savedCollection