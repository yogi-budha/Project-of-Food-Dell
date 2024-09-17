import express from 'express'
import { orderitem, placeOrdercontroller, status, userOrders, verifyOrder } from '../controllers/placeOrderController.js'
import cartMidleware from '../middleware/cartMiddleware.js';

const placeOrderRoutes = express.Router()

placeOrderRoutes.post("/place",cartMidleware,placeOrdercontroller)
.post("/verify",verifyOrder)
.post("/userorders",cartMidleware,userOrders)
.get('/list',orderitem)
.post('/status',status)

export default placeOrderRoutes;
