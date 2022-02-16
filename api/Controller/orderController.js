const Order = require("../models/Order");

exports.createOrder = async(req, res) => {
    const newOrder = new Order(req.body) 
    try{
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.updateOrder = async(req, res) => {
    try{
        const updatedOrder = awaitdOrder.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.deleteOrder = async(req, res) => {
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted..")
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getOrderById = async(req, res) => {
    try{
        const order = await Order.find({userId: req.params.userId})
        res.status(200).json(order)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getAllOrders = async(req, res) => {
    try{
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getOrdersIncome = async(req, res) => {
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))

    try{
        const income = await Order.aggregate([
            {$match: {createdAt: {$gte: previousMonth}, ...(productId && {
                products:{ $elemMatch: {productId:productId}}
            })}},

            {
                $project:{ month:{$month: "$createdAt"},
                sales: "$amount",
            }},
            {
                $group:{
                    _id: "$month",
                    total: {$sum: "$sales"}
                },
            },
        ])
        res.status(200).json(income)
    } catch(err){

    }
}