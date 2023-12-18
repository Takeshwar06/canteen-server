const mongoose=require("mongoose")

const devloperSchema=new mongoose.Schema({
    devName:{
        type:String,
        default:"Tiger",
    },
    devImage:{
        type:String,
        default:"https://res.cloudinary.com/do3fiil0d/image/upload/v1700579289/foodimages/tbhgehwao4xxu70zalyt.jpg"
    },
    coin:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model("Devloper",devloperSchema)