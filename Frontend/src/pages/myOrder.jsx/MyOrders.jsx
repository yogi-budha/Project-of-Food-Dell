import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios'
import './myOrder.css'

import parcelbox from '../../assets/parcel_icon.png'

const MyOrders = () => {

    const {mainurl,token,getTotalCartAmount} = useContext(StoreContext)

    const [data,setData] = useState([])

    const fetchOrder = async ()=>{
        const response = await axios.post(mainurl+'/api/order/userorders',{},{
            headers:{
                token:token
            }
        })

        setData(response.data.orders)

        console.log(response)


    }

    console.log(data)


console.log(token)

    useEffect(()=>{
        if(token){
            fetchOrder()
        }
    },[token])
  return (
    <div className='main'>

        {
            data.map((value)=>(
                <>
                <div className='container'>

                <img src={parcelbox} alt="" />

                <div>
                  {value.items.map((item)=>(
                    <>
                    <p>{item.name} x<span>{item.quantity}</span></p>
                    </>
                  ))}  
                </div>
                  <div>
                <p>Price: RS.{value.amount}</p>
                  </div>
                  <div>
            <p>items:{value.items.length}</p>
            <p>&#x25cf;<span>{value.status}</span></p>
                  </div>
                  <button onClick={()=>fetchOrder()}>Track order</button>
                </div>
                <hr />

                </>
            ))
        }


    </div>
  )
}

export default MyOrders