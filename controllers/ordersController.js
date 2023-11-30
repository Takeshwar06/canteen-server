
const Order = require("../model/orderModel")
const qr = require("qrcode")
const schedule = require('node-schedule');
module.exports.addorder = async (req, res, next) => {
    try {

        const { UserId, foodprice, EmployeeId, uniqueOrderId, foodname, foodQuantity, foodimg, placed, order_id } = req.body;
        // Generate QR code
        qr.toDataURL(uniqueOrderId, async (err, url) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                // successfully generate QR code
                const data = await Order.create({
                    uniqueOrderId,
                    foodname: foodname,
                    rejected: false,
                    take: { notTaken: true, takenByMe: null },
                    auth: [UserId, EmployeeId],
                    foodQuantity: foodQuantity,
                    foodimg: foodimg,
                    foodprice: foodprice,
                    placed: placed,
                    deleted: false,
                    QRurl: url,
                    QRvalid: true,
                    order_id: order_id
                });
                if (data) {
                    return res.json({ msg: "order added successfully." });
                }
                return res.json({ msg: "Failed to add order to the database." });
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports.getAllorderForEmployee = async (req, res, next) => {
    try {
        const { Head, day, month, year, wise, endDay, endMonth, endYear } = req.body;

        if (!Head) {
            // const allOrder=await Order.find({placed:false})
            const allOrder = await Order.find({ placed: false, rejected: false })
                .sort({ updatedAt: 1 })
            res.json(allOrder)
        }
        else if (Head === "head@rungta.com") {

            if (!wise) {
                const allOrder = await Order.find({
                    date: {
                        '$gte': `${year}-${month}-${day}T00:00:00.000Z`,
                        '$lte': `${endYear}-${endMonth}-${endDay}T23:59:59.999Z`
                    }
                })
                    .sort({ updatedAt: 1 })
                res.json(allOrder);
            }
            else {
                if (wise === "day") {

                    const allOrder = await Order.find({
                        date: {
                            '$gte': `${year}-${month}-${day}T00:00:00.000Z`,
                            '$lte': `${year}-${month}-${day}T23:59:59.999Z`
                        }
                    })
                        .sort({ updatedAt: 1 })
                    res.json(allOrder);

                } else if (wise === "month") {

                    const allOrder = await Order.find({
                        date: {
                            '$gte': `${year}-${month}-01T00:00:00.000Z`,
                            '$lte': `${year}-${month}-31T23:59:59.999Z`
                        }
                    })
                        .sort({ updatedAt: 1 })
                    res.json(allOrder);
                } else if (wise === "year") {

                    const allOrder = await Order.find({
                        date: {
                            '$gte': `${year}-01-01T00:00:00.000Z`,
                            '$lte': `${year}-12-31T23:59:59.999Z`
                        }
                    })
                        .sort({ updatedAt: 1 })
                    res.json(allOrder);
                }
            }

        }
    } catch (error) {
        next(error);
    }
}

module.exports.UpdateOrder = async (req, res, next) => {
    try {
        const { placed } = req.body;
        const updatedOrder = await Order.updateOne({ uniqueOrderId: req.params.id }, { $set: { placed: placed } })
        // shedule job
        schedule.scheduleJob(new Date(Date.now() + 2 * 60 * 60 * 1000), async () => {
            await Order.updateOne({ uniqueOrderId: req.params.id },
                { $set: { QRvalid: false } })
            console.log('QR Code expire from the database');
        });
        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
}
module.exports.UpdateTake = async (req, res, next) => {
    try {
        const { take } = req.body;
        const updatedOrder = await Order.updateOne({ uniqueOrderId: req.params.id }, { $set: { take: take } })
        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
}

module.exports.UpdateDeleted = async (req, res, next) => {
    try {
        const { deleted } = req.body;
        const updatedOrder = await Order.updateOne({ uniqueOrderId: req.params.id },
            { $set: { deleted: deleted } })
        res.json(updatedOrder);
    } catch (error) {
        next(error);
    }
}

module.exports.updateReject = async (req, res, next) => {
    try {
        const { rejected } = req.body;
        const updateOrder = await Order.updateOne({ uniqueOrderId: req.params.id },
            { $set: { rejected: rejected } })
        res.json(updateOrder);
    } catch (error) {
        next(error);
    }
}
// fetching through QR
module.exports.getOrderThroughQr = async (req, res, next) => {
    try {
        const { qrId } = req.body;
        const order = await Order.find({ uniqueOrderId: qrId, QRvalid: true })
        res.json(order)
    } catch (error) {
        next(error)
    }
}
module.exports.expireQr = async (req, res, next) => {
    try {
        const updateOrder = await Order.updateOne({ uniqueOrderId: req.params.id },
            { $set: { QRvalid: false } })
        res.json(updateOrder);
    } catch (error) {
        next(error)
    }
}
module.exports.getAllOrderForUser = async (req, res, next) => {
    try {
        const { UserId, EmployeeId } = req.body;
        const order = await Order.find({
            auth: {
                $all: [UserId, EmployeeId],
            },
            deleted: false
        })
            .sort({ updatedAt: 1 });
        // const projectMessages=messages.map((msg)=>{
        //     return {
        //         fromSelf:msg.sender.toString() ===from,  // asigned value true or false
        //         message:msg.message.text,
        //     };
        // });
        res.json(order);

    } catch (error) {
        next(error);
    }
}