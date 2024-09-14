import userModel from '../models/userModel.js';
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


function jwtToken(id){
 return   jwt.sign({userId:id},process.env.JWT_SECREATKEY)
}

// Login User
const loginUser =async (req,res)=>{



    try {
     const {email,password } = req.body

    const user = await userModel.findOne({email:email})

    console.log(user)


        if(!user){
            return res.json({success:false,message:"user Doesnot exist"})

        }

       await bcrypt.compare(password, user.password, function(err, result) {

            console.log(result)
           
         if(result){

            const token =jwtToken(user._id)

         return   res.json({success:true,message:"successsfully login",token:token})

         }
         else{
            return res.json({success:false,message:'Invalid Credentials'})
         }
        });

        
        
    } catch (error) {
        
        console.log("error---------->",error)

        res.json({success:"false",message:" somefield is invalid"})
    }
    
}

// Register User
const registerUser = async (req,res)=>{

    const {email,name,password} = req.body

    const exist =await userModel.findOne({email})
    try {
        if(exist){

            return res.json({success:false,message:"email already exist"})
        }

        if(!validator.isEmail(email)){

            return res.json({success:false,message:"your email is invalid"})
        }
        if(password.length<8){
            
            return res.json({success:false,message:"please enter the strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name,
            email,
            password:hashPassword
        })

      

          const user =   await newUser.save()

      const token =   jwtToken(user._id)

      res.send({"success":true,token:token})


    } catch (error) {
        console.log("first",error)
    }

}


export {loginUser,registerUser}