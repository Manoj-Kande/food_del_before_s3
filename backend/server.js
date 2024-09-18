import express from "express";
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDb } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";

import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// Create __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDb();

// Serve static files
app.use("/images", express.static('uploads'));

// API routes
app.use("/api/food", foodRouter);
app.use("/api/user",userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


app.get("/", (req, res) => {
    res.send("API Working for path => /");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
