import mongoose from "mongoose";

const foodSchema =new mongoose.Schema({
        name:{
            type:String,
            reqried:true
        },
        description:{
            type:String,
            requried:true
        },
        price:{
            type:Number,
            reqried:true
        },
        image:{
            type:String,
            reqried:true
        },
        category:{
            type:String,
            reqried:true
        }
});


const foodModel=mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;