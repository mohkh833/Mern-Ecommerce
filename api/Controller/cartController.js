const Cart = require("../models/Cart");

exports.createCart = async (req, res) => {
    const newCart = new Cart(req.body) 
    try{
        const savedCart = await newCart.save()
        res.status(200).json(savedCart)
    }catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.updateCart = async(req, res) => {
    try{
        const updatedCart = awaitdCart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCart)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.deleteCart = async(req, res) => {
    try{
        await Cart.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted..")
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getCart = async(req, res) => {
    try{
        const cart = await Cart.find({userId: req.params.userId})
        res.status(200).json(cart)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getAllCarts = async(req, res) => {
    try{
        const carts = await Cart.find()
        res.status(200).json(carts)
    } catch(err){
        res.status(500).json(err)
    }
}