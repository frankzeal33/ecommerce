const orderModel = require("../../models/orderProductModel")


const orderController = async(req,res)=>{
    try{
        const currentUserId = req.userId

        const orderList = await orderModel.find({userId: currentUserId}).sort({ createdAt: -1})

        res.json({
            data: orderList,
            message: "Order list",
            success: true
        })


    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = orderController