const Coin=require("../model/coinModel")

module.exports.createCoin=async(req,res,next)=>{
    try {
        const {userName,userEmail,userImage}=req.body;
        const user=await Coin.findOne({ userEmail: userEmail })
        if(user){
            return res.json({create:false,userId:user.userId});
        }else{
            const userId=Math.ceil(Math.random() * 1000000000 + (9999999999 - 1000000000));
            const userData=await Coin.create({
              userName,userEmail,userId,userImage
            })
            return res.json({create:true,userId:userId})
        }

    } catch (error) {
        next(error)
    }
}

module.exports.getCoin=async(req,res,next)=>{
    try {
        const {userId}=req.body;
        const data=await Coin.find({userId})
        res.json(data);
    } catch (error) {
        next(error);
    }
}

module.exports.coinPlus=async(req,res,next)=>{
    try {
        const {updatedCoin,userId}=req.body;
        const data=await Coin.updateOne({userId},
        {$inc:{coin:updatedCoin}})
        res.json(data);
    } catch (error) {
        next(error);
    }
}
module.exports.coinMinus=async(req,res,next)=>{
    try {
        const {updatedCoin,userId}=req.body;
        const data=await Coin.updateOne({userId},
        {$inc:{coin:-updatedCoin}})
        res.json(data);
    } catch (error) {
        next(error);
    }
}