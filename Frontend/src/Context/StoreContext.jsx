import { createContext, useEffect, useState } from "react";
import axios from 'axios'
// import { food_list } from "../assets/assets";

export  const StoreContext = createContext(null);

 const StoreContextProvider = (props)=>{
    const [cartItem,setCartItem]= useState({})
    const [token,setToken] = useState("")
    const [food_list,setFood_list] = useState([])

    const mainurl = 'http://localhost:4000'

    const addToCart = async (itemId)=>{
        if(!cartItem[itemId]){

            setCartItem((prev)=>({...prev,[itemId]:1}))
        }else{
            setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        }
    if(token){
        await axios.post(`${mainurl}/api/cart/addCart`,{itemId},{headers:{token}}).then(()=>{
            console.log("sucessfully eslk")
        })
    }
        
    }
   
      const getTotalCartAmount = ()=>{
        let totalAmount = 0
        for(const item in cartItem){
            if(cartItem[item]>0){


                let iteminfo = food_list.find((product)=>product._id===item);
                totalAmount += iteminfo.price*cartItem[item]
            }
        }
return totalAmount
      }


    
    const removeToCart = async (itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))

        if(token){
            await axios.post(`${mainurl}/api/cart/removeRoute`,{itemId},{headers:{token}})
        }

}
      
const fetctchDataval=async (token)=>{
    await axios.post(`${mainurl}/api/cart/getRoute`,{},{headers:{token}}).then((res)=>{
     setCartItem(res.data.message)
    // console.log(res.data.message)
    })
}

    const fetchFunction  = async()=>{

        await axios.get(`${mainurl}/api/food/list`).then((res)=>{
            setFood_list(res.data.message)
            // console.log(res.data.message)
        })

    }

    const contextValue = {
        
        cartItem,
        setCartItem,
        addToCart,
        removeToCart,
        getTotalCartAmount,
        token,
        setToken,
        food_list,
        setFood_list,
        mainurl

    }

    console.log(cartItem)
     useEffect(()=>{

        async function loadData(){
            await fetchFunction()
            if(localStorage.getItem('token')){
            setToken(localStorage.getItem("token"))
            await fetctchDataval(localStorage.getItem("token"))
        } 
        }
       
        loadData()
     },[])

    
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider;
