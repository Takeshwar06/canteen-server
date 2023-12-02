const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const foodRoutes =require("./routes/foodRoutes")
const orderRouter =require("./routes/orderRoute")
const paymentRoute =require("./routes/paymentRoute")
const inventoryRoute=require("./routes/inventoryRoute")
const stockEntryRoute=require("./routes/stockEntryRoute")
const stockIssueRoute=require("./routes/stockIssueRoute")
const coinRoute=require("./routes/coinRoute")
const Razorpay=require('razorpay')
const socket = require("socket.io")
const app=express();
require("dotenv").config();  // npm package

app.use(cors());
app.use(express.json()); // **
app.use(express.urlencoded({extended:true}));

app.use("/api/food",foodRoutes)
app.use("/api/order",orderRouter)
app.use("/api/payment",paymentRoute)
app.use("/api/inventory",inventoryRoute)
app.use("/api/stockEntry",stockEntryRoute)
app.use("/api/stockIssue",stockIssueRoute)
app.use("/api/coin",coinRoute)

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("connected to mongo successfully");
    
})

// initialize razorpay in paymentController
//  const instance=new Razorpay({
//     key_id: process.env.RAZORPAY_API_KEY,
//     key_secret: process.env.RAZORPAY_API_SECRET
// })

  // static file
    // app.use(express.static("client/build"));


const server=app.listen(process.env.PORT||5000,()=>{
    console.log(`sever started on port ${process.env.PORT}`)
})


// socket.io --->
const io=socket(server,{
      cors:{
        // origin:process.env.ORIGIN,
        credentials:true
      }
})
//  global.user=new Map();
// io.on("connection",(socket)=>{
//     console.log("connecte ho gya")
//     socket.on("add-user",(userid)=>{
//         console.log(userid)
//         user.set(userid,socket.id);
//     })
    
//     socket.broadcast.emit("added-user",user);
//     console.log(user)
// })

global.user=new Map();
global.employee=new Map();

io.on("connection",(socket)=>{
    console.log("connected...");
    socket.on("add-employee",(employeeid)=>{
        console.log("add-employee");
        employee.set(employeeid,socket.id);
    })
    socket.on("add-user",(userid)=>{
        console.log("add-user",userid);
        user.set(userid,socket.id)
    })
    socket.on("send-order",(order)=>{
        console.log("employee socket",employee);
        employee.forEach((empSocket)=>{
            io.to(empSocket).emit("recieve-order",order)
          })
   
    })     

    socket.on("complete-order",(completedOrder)=>{
       const orderComplete=user.get(completedOrder.auth[0])
        console.log("complete call",completedOrder.auth[0])
        // socket.broadcast.emit("testing",{name:"tiger",age:21})
        socket.broadcast.emit("completed-order",completedOrder);
       
    })

    socket.on("take-order",({order,employeeId,index})=>{
        console.log("take-order")
        socket.broadcast.emit("took-order",{order,employeeId,index});
        
    })
  
    socket.on("reject-order",(rejectedOrder)=>{
        const orderReject=user.get(rejectedOrder.auth[0])
        console.log("rejected",orderReject,user)
        socket.broadcast.emit("rejected-order",rejectedOrder);
    })
})