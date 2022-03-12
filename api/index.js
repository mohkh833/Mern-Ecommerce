const express = require('express')
const app = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const cartRoute = require("./routes/cart")
const stripeRoute = require("./routes/stripe")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const multer = require("multer");

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("dbconnect"))
.catch((err)=>{console.log(err)})
app.use(cors())
app.use(express.json())

const fileStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "images");
    },
    filename: function(req, file, cb){
        cb(null, uuidv4())
    },
})

const fileFilter = (req, file ,cb) => {
    if(
        file.mimetype ==="image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg"
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/carts", cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/checkout",stripeRoute)



app.listen(process.env.PORT || 5000 , ()=> {
    console.log("Backend server")
})