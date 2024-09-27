import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend

const placeOrder = async (req, res) => {

  const frontend_url = "https://food-del-before-s3.vercel.app"

  try {

    let id=req.body.userId;
    const newOrder = new orderModel({
      userId: id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    const line_items = req.body.items.map((item)=>({
          price_data:{
            currency: 'aud',
            product_data:{
              name:item.name
            },
            unit_amount: item.price*100
          },
          quantity:item.quantity
    }));
    line_items.push({
      price_data:{
        currency: 'aud',
        product_data:{
          name: 'Delivery Fee',
        },
        unit_amount:2*100
      },
      quantity:1
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode:'payment',
      success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}&user_Id=${id}`,
      cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    })

    res.json({ success: true, session_url:session.url });
  } catch (error) {
    console.error("Error saving order:", error);
    res.json({ success: false, message: "Error payment placement order" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success,user_Id } = req.body;

  try {
    if (success === "true") {
    await userModel.findByIdAndUpdate(user_Id, { cartData: {} });
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      res.json({ success: true, message: "payment is  successfully" });
    } else {
      await orderModel.findByIdAndUpdate(orderId);
      console.log("payment failed")
      res.json({ success: false, message: "Payment not completed" });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.json({ success: false, message: "Order not placed, error during payment" });
  }
};

// User orders for frontend
const userOrders = async (req, res) => {
  try {
    let id=req.body.userId;
    const orders = await orderModel.find({userId : id });
    res.json({ success: true, data: orders, message: "Orders list fetched successfully" });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.json({ success: false, message: "Error while fetching the orders list" });
  }
};


// Listing orders for admin panel

const  listOrders =async (req,res)=>{
      try {
        const orders= await orderModel.find({});
        res.json({ success: true, data: orders, message: "Orders list fetched successfully"})
      } catch (error) {
        console.log("Error while fetching of all orders in admin pannel");
        res.json({ success: false, message: "Error while fetching the orders list for admin pannel" });
      }
}

// api for updating order status

const updateStatus = async (req,res)=>{
    try {
      await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
      res.json({ success: true, message: "Order status updated successfully" });
    } catch (error) {
      console.log("Error while changing status of order in admin pannel");
      res.json({ success: false, message: "Error while updating the order status in admin pannel" });
    }
}

export { placeOrder, verifyOrder, userOrders ,listOrders,updateStatus};
