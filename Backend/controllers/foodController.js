import foodModel from "../models/foodModel.js";

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



  
// add food item

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`

  
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        catagory:req.body.catagory,
        image:image_filename
    })
    
            await food.save()
            
            res.json({message:"sucessfully added"})
    // try {
        
    // } catch (error) {
    //     res.json({message:"error"})
        
    // }
}

const foodList = async (req,res)=>{
    const list = await foodModel.find()
    res.json({message:list})
}

const removeFood = async (req,res)=>{
    const food = await  foodModel.findById(req.body.id)

    fs.unlink( `uploads/${food.image}`, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log('File deleted successfully');
        }
      })
      await foodModel.findByIdAndDelete(req.body.id)
   
      try {
       res.json({message:"sucessfully deleted"})
       
      } catch (error) {
   
       res.json({message:"error"})
       
      }
    }



export {addFood,foodList,removeFood}