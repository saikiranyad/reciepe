const mongoose = require('mongoose');


const connectiontodb = async()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGOURI)
        console.log('connected to db')

    }catch(err){
        console.log(err)
    }
}

module.exports = connectiontodb