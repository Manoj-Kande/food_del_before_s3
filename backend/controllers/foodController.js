import foodModel from "../models/foodModel.js";
import fs from 'fs';

// import { food_list } from "../assets/assets.js";

// add food item

const addFood=async (req,res)=>{
    
    let image_filename=`${req.file.filename}`;

    const food =new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    });


    try {
        food.save();    
        res.json({success:true,message:"Food Added"});
    } catch (err) {
        console.log("error while saving the food in the adding time");
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


// all food list

const listFood=async (req,res)=>{
    try {
        const foods= await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (err) {
        console.log("error while fetching the food list");
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}


// remove food item

const removeFood = async (req,res)=>{

    try {
        const food= await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{});

        await foodModel.findByIdAndDelete(req.body.id)
        .then(()=>{
            console.log("Deleted Data Successfully");
        })
        .catch((err)=>{
            console.log("Error while deleting the date");
        });
        res.json({success:true,message:"Food Removed"});

    } catch (err) {
        console.log("error while deleting the error");
        console.log(err);
        res.json({success:false,message:"Error"});
    }

}

export {addFood,listFood,removeFood};