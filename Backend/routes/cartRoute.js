import express from 'express'
import { addCartItem, getCartItem, removeCartItem } from '../controllers/cartController.js'
import cartMidleware from '../middleware/cartMiddleware.js'

const cartRoute = express.Router()

cartRoute.post('/addCart',cartMidleware,addCartItem)
cartRoute.post("/removeRoute",cartMidleware,removeCartItem)
cartRoute.post("/getRoute",cartMidleware,getCartItem)


export default cartRoute

