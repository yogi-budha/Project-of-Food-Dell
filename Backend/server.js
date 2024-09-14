// require('dotenv').config();

import dotenv from 'dotenv';
dotenv.config();
import express from "express"
import cors from 'cors'
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"

import path from 'path';
import { fileURLToPath } from 'url';
import cartRoute from './routes/cartRoute.js';
import placeOrderRoutes from './routes/placeOrderRoute.js';


// app config
const app = express()
const port = 4000
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// middleware
app.use(cors())
app.use(express.json())

//db connection

connectDB()


// api endpoints
app.use('/api/food',foodRouter)
app.use('/image', express.static(path.join(__dirname, 'uploads')));
app.use("/api/user",userRouter)
app.use("/api/cart",cartRoute)
app.use("/api/order",placeOrderRoutes)

app.get('/',(req,res)=>{
    res.send("Api is currently working")
})

app.listen(port,()=>{
    console.log(`Server started on http://localhost:${port}`)
})

