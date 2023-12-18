const mongoose=require("mongoose");

const foodSchema= new mongoose.Schema({
    foodname:{
        type:String,
        required:true,
        min:2,
        max:20,
    },
   foodprice:{
    type:Number,
    required:true
   },
   foodimg:{
    type:String
   },
   foodAvailable:{
      type:Boolean,
      default:false
   },
    testRate:{
        type:Number,
        default:0
    },
    qualityRate:{
        type:Number,
        default:0
    },
    hygienicRate:{
        type:Number,
        default:0
    },
    totalRate:{
        type:Number,
        default:0
    },
    comment:[{
        userName:String,
        userImage:String,
        commentText:String,
        commentImage:Array(String),
    }]

});
module.exports= mongoose.model("Foods",foodSchema);