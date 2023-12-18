const Foods=require("../model/foodModel")

// module.exports.addfood=async(req,res,next)=>{
//   try {
//     const {foodname,foodprice}=req.body;
//     const {foodimg}=req.file;
//    console.log("img  ",foodname);
//     const checkFood=await Foods.findOne({foodname});
   
//     if(checkFood){
//      return res.json({msg:"this food is already used",status:false})
//     }
//     const food=await Foods.create({
//     foodname:foodname,
//     foodprice:foodprice,
//     foodimg:foodimg

//     })
//     console.log(food,req.file);
//     return res.json({status:true,food});
//   } catch (error) {
//     next(error);
//   }
// }
module.exports.updateAvailableFoods=async (req,res,next)=>{
  try {
   
    const {foodAvailable}=req.body;
    let response=await Foods.updateOne({_id:req.params.id},{$set:{foodAvailable:foodAvailable}})
    res.json(response);

  } catch (error) {
   next(error); 
  }
}
module.exports.getAllFoods =async(req,res,next)=>{
   try {
    const foods=await Foods.find()
    return res.json(foods);
   } catch (error) {
    next(error);
    
   }
}
module.exports.getFoodById =async(req,res,next)=>{
   try {
    const food=await Foods.find({_id:req.params.id})
    return res.json(food);
   } catch (error) {
    next(error);
    
   }
}
module.exports.upDateRating =async(req,res,next)=>{
   try {
    const {testRate,qualityRate,hygienicRate,commentText,commentImage,userName,userImage}=req.body;
    // Find the food item by ID
    const food = await Foods.findById(req.params.id)

    if (!food) {
      return res.status(404).send('Food item not found');
    }

    // Increment the existing rating fields
    food.testRate = (food.testRate || 0) + (testRate || 0);
    food.qualityRate = (food.qualityRate || 0) + (qualityRate || 0);
    food.hygienicRate = (food.hygienicRate || 0) + (hygienicRate || 0);
    food.totalRate = (food.totalRate || 0) + 15;
    // check if commentImage array has element or commentText length>0
    console.log(commentImage,commentText);
    if(commentText.length>0||commentImage.length>0){
      const newComment = {
        userName,
        userImage,
        commentText,
        commentImage
      };
  
      food.comment = food.comment || []; // Ensure the comment field exists
      food.comment.push(newComment);
    }
    // Save the updated food item
    await food.save();
    return res.status(200).json({success:true,msg:"update rating successfully"})
   } catch (error) {
    next(error);
    
   }
}
