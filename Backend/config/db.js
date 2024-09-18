import mongoose  from "mongoose";

export const connectDB = async ()=>{
    await mongoose.connect(`mongodb+srv://yogeshbudha829:X97D5GXslDX6LkG2@cluster0.faw5l.mongodb.net/food-appDB`).then(()=>console.log('DB connected'))
}