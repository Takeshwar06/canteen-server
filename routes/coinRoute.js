const {  getCoin, createCoin, coinPlus, coinMinus}=require("../controllers/coinController")

const router=require("express").Router();

router.post("/createcoin",createCoin);
router.post("/getCoin",getCoin);
router.post("/coinplus",coinPlus);
router.post("/coinminus",coinMinus);

module.exports=router;
