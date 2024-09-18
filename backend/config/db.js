import mongoose from "mongoose";

const connectDb=async (req,res)=>{
    await mongoose.connect("mongodb+srv://2210030472:2210030472@cluster0.hrp4gzh.mongodb.net/food-del")
    .then(()=>{
        console.log("Connected to Database Successfully");
    })
    .catch((err)=>{
        console.log("Error while connecting to Database");
    });
}

export {connectDb};