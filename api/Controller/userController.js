const User = require("../models/User");
const CryptoJS = require("crypto-js");
const fs = require("fs")

exports.updateUser = async (req, res) => {
    let {username, email, password} = req.body
    let img
    if(req.file){
        img =req.file.path
    }
    try {
        if (req.body.password) {

            password = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.PASS_SEC
                ).toString();

            const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    ...username && {username},
                    ...email && {email},
                    ...password && {password},
                    img :img,
                } 
            },
            { new: true }
        );
        }
        await User.findByIdAndUpdate(
            req.params.id,
        {
            $set: {
                ...username && {username},
                ...email && {email},
                img : img,
            } 
            }
        );
        const updatedUser = await User.findById(req.params.id)
        
        console.log(updatedUser)
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}

exports.deleteUser = async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted..");
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getUserById = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getAllUsers = async(req, res) => {
    const query = req.query.new;
    try {
    const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.getUserStats = async(req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
    const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
        $project: {
            month: { $month: "$createdAt" },
        },
        },
        {
        $group: {
            _id: "$month",
            total: { $sum: 1 },
        },
        },
    ]);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
}

exports.uploadImage= async(req, res) => {
    
    console.log(req.file)
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
    {
        $set: {img: req.file.path} ,
        },
        { new: true }
    )
}