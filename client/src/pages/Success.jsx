import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethod";

const Success = () => {
    const location = useLocation()
    const data = location.state.stripeData
    const products = location.state.products;
    const currentUser = useSelector((state) => state.user.currentUser);
    const [orderId, setOrderId] = useState(null)
    console.log(location.state)

    useEffect(()=> {
        const createOrder = async() => {
            try{
                const res = await userRequest.post("/orders", {
                  userId: currentUser._id,
                    products: products.products.map((item) => ({
                        productId: item._id,
                        quantity: item._quantity,
                    })),
                    amount: products.total,
                    address: data.billing_details.address,
                })
                console.log(res.data._id)
                setOrderId(res.data._id)
            }
            catch(err){
              console.log(err)
            }
        }
        data && createOrder()
    },[products , data, currentUser]
    )
    return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {orderId
            
            ? `Order has been created successfully. Your order number is ${orderId}`
            : `Successfull. Your order is being prepared...`}
          <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
        </div>
      );
    };
export default Success