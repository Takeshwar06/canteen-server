const mongoose=require("mongoose")

const coinSchema=new mongoose.Schema({
    userId:String,
    userName:String,
    userEmail:String,
    userImage:String,
    coin:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Coin",coinSchema)