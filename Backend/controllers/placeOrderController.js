import { placeOrderModel } from '../models/orderModel.js'
import Stripe from 'stripe'
import User from '../models/userModel.js'

const stripe = new Stripe('sk_test_51Puv2XRqtSXxmFegogzSPLrty9PD2IGuJpuW57mFDjfx4j7u487M7f26f6qILx1CEZXIkpa0kmtXqmozSlk4W5vo00MgGrTN3O'); 
const placeOrdercontroller = async (req,res)=>{ 

    const frontend_url = "http://localhost:5173"

    try {

        const {userId,amount,address,items,status} =  req.body
        
        const newplaceOrder = new placeOrderModel({
            userId,amount,address,items,status
        })

        await newplaceOrder.save()

        await User.findByIdAndUpdate(req.body.userId,{cardData:{}})

        const line_items = req.body.items.map((item)=>({
            price_data: {
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount : item.price *100
            },
            quantity:item.quantity * 100
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount: 2 * 100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newplaceOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newplaceOrder._id}`,

        })

        res.json({success:true,session_url:session.url})
        
    } catch (error) {
        console.log(error)

        res.status(400).json({success:false,message:"internal server error"})
        
    }

}


const verifyOrder = async (req,res)=>{
    const {orderId,success} = req.body

    try {
        
        if(success == 'true'){
            await placeOrderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"paid"})
        }else{
            await placeOrderModel.findByIdAndDelete(orderId)
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {

        console.log(error)

        res.status(200).json({success:false,message:"Internal server error"})
        
    }
}

const userOrders = async (req,res)=>{

    

    try {
        
        const orders = await placeOrderModel.find({userId:req.body.userId})

        res.json({success:true,orders})
    } catch (error) {

        console.log(error)
        res.json({success:false,message:"error"})
        
    }



}

const orderitem = async (req,res)=>{

    try {
          const orders = await placeOrderModel.find({})

    res.status(200).json({success:true,orders})
    } catch (error) {

        res.status(400).json({success:false,message:"error"})
        
    }
  
}

const status = async (req,res)=>{
    try {
        
        const statusval = await placeOrderModel.findByIdAndUpdate(req.body.userId,{status:req.body.state})

        res.status(200).json({success:true,message:"updated successfully",statusval})
    } catch (error) {

        res.status(400).json({success:false,message:"error on status field"})
        
    }
}

export {placeOrdercontroller,verifyOrder,userOrders,orderitem,status}