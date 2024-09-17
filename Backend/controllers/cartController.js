import userModel from "../models/userModel.js";

// add cartItem

const addCartItem = async (req, res) => {
  const data = await userModel.findOne({ _id: req.body.userId });

  console.log(data)

  const cartData = await data.card;

  if (!cartData[req.body.itemId]) {
    cartData[req.body.itemId] = 1;
  } else {
    cartData[req.body.itemId] = cartData[req.body.itemId] + 1;
  }
  await userModel.findByIdAndUpdate(data._id,{card:cartData})

  res.send({"message":"Successfully Added"})

};

// remove cartItem

const removeCartItem = async (req, res) => {
    try {

        const data = await userModel.findOne({_id:req.body.userId})

        const cartData = await data.card

        if(cartData[req.body.itemId]>0){

            cartData[req.body.itemId] = cartData[req.body.itemId] - 1
        }

        await userModel.findByIdAndUpdate(data._id,{card:cartData})

        res.json({success:true,message:"cart deleted"})
        
    } catch (error) {

        res.json({success:false,message:"error occurs "})
        
    }
};

//get CartItem
const getCartItem = async (req, res) => {
    const userData = await userModel.findById(req.body.userId)

    const cartData = await userData.card

    res.json({success:true,message:cartData})
};

export { addCartItem, removeCartItem, getCartItem };
