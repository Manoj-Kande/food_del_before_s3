// import express from "express";

// import { addFood, listFood, removeFood } from "../controllers/foodController.js";
// import multer from "multer";

// const foodRouter=express.Router();


// Image Storage Engine

// const storage=multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload=multer({storage:storage});
// foodRouter.post("/add",upload.single("image"),addFood);
// foodRouter.get("/list",listFood);
// foodRouter.post("/remove",removeFood);

// export default foodRouter;


import express from "express";

// import { addFood, listFood, removeFood } from "../controllers/foodController.js";
// import multer from "multer";

// const foodRouter=express.Router();


// // Image Storage Engine

// const storage=multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null,`${Date.now()}${file.originalname}`)
//     }
// })

// const upload=multer({storage:storage});
// // foodRouter.post("/add",upload.single("image"),addFood);
// foodRouter.get("/list",listFood);
// foodRouter.post("/remove",removeFood);

// export default foodRouter;


// import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";
import path from "path";

const foodRouter = express.Router();

// Image Storage Engine (Temporary Directory)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/tmp'); // Use the temporary directory
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Use the current timestamp in the filename
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

export default foodRouter;