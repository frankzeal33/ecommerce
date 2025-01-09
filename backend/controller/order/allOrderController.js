const userModel = require("../../models/userModel")
const orderModel = require("../../models/orderProductModel")

const allOrderController = async(req,res)=>{
    try{
        const userId = req.userId

        const user = await userModel.findById(userId)

        if(user.role !== "ADMIN"){
            return  res.status(500).json({
                message: "Dont have access",
                error : true,
                success: false
            })
        }

        const allOrder = await orderModel.find().sort({ createdAt: -1})

        res.status(200).json({
            data: allOrder,
            success : true
        })

    }catch(err){
        res.status(400).json({
            message : err.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = allOrderController