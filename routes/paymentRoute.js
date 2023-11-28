const express=require('express');
const { ordergenerate, paymentVarification, getkey, paymentVarificationForApp } = require('../controllers/paymentController');

const router=express.Router();

router.post("/ordergenerate",ordergenerate);
router.post("/paymentvarification",paymentVarification);
router.post("/paymentvarificationforapp",paymentVarificationForApp);
router.get("/getkey",getkey);
module.exports= router;