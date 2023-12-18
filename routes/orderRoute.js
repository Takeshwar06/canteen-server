const { addorder, getAllorderForEmployee, getAllOrderForUser, UpdateOrder, UpdateDeleted, UpdateTake, updateReject, getOrderThroughQr, expireQr, upDateRated, oneKeyForReturnMoney, getUserOrderHistory } = require('../controllers/ordersController');

const router=require('express').Router();

router.post("/addorder",addorder);
router.post("/getAllOrderForEmployee",getAllorderForEmployee);
router.post("/getAllOrderForUser",getAllOrderForUser);
router.post("/getuserorderhistory",getUserOrderHistory);
router.post("/updateOrder/:id",UpdateOrder);
router.post("/updateDeleted/:id",UpdateDeleted);
router.post("/updateTake/:id",UpdateTake);
router.post("/upDateRated/:id",upDateRated);
router.post("/updateReject/:id",updateReject);
// get order through QR
router.post("/getOrderThroughQr",getOrderThroughQr);
router.post("/expireQr/:id",expireQr);
router.get("/onekeyforreturnmoney",oneKeyForReturnMoney);

module.exports=router;