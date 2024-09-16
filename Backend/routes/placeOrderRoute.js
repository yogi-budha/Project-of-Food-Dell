import express from 'express'
import { placeOrdercontroller, userOrders, verifyOrder } from '../controllers/placeOrderController.js'
import cartMidleware from '../middleware/cartMiddleware.js';

const placeOrderRoutes = express.Router()

placeOrderRoutes.post("/place",cartMidleware,placeOrdercontroller)
.post("/verify",verifyOrder)
.post("/userorders",cartMidleware,userOrders)

export default placeOrderRoutes;
