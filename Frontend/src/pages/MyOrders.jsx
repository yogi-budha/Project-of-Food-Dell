import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import axios from 'axios'

const MyOrders = () => {

    const {url,token} = useContext(StoreContext)

    const [data,setData] = useState([])

    const fetchOrder = async ()=>{
        const response = await axios.post(url+'/api/order/userorders',{},{headers:{token:token}})

        setData(response.data.data)

        console.log(response)
    }

    useEffect(()=>{
        if(token){
            fetchOrder()
        }
    },[token])
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders