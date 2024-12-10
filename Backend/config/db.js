import mongoose  from "mongoose";

export const connectDB = async ()=>{
    try {
        
    await mongoose.connect(`${process.env.mongoDB_uri}/food_del_App`).then(()=>console.log('DB connected'))
    } catch (error) {

        console.log("error while connecting mongodb",error)
        
    }
}