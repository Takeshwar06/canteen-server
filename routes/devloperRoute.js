const { createDevloper, oneCoinToDev, getDevInfo }=require("../controllers/devloperController")

const router=require("express").Router();

router.post("/createdevloper",createDevloper);
router.get("/onecointodev",oneCoinToDev);
router.post("/getdevinfo",getDevInfo);


module.exports=router;