import { useEffect, useState } from "react"
import axios from 'axios'
import parcel from '../assets/parcel_icon.png'


function Order() {

  const [orderData,setOrderData] = useState([])
  const [status,setStatus] = useState("")
  
  const url  = 'http://localhost:4000'

  async function fetchitem(){
    axios.get(`${url}/api/order/list`).then((res)=>{
      console.log(res.data)
      setOrderData(res.data.orders)
    })
  }  

  async function updatedStatus(e,userId) {
axios.post(`${url}/api/order/status`,{userId,state:e.target.value}).then((res)=>{
  console.log(res)
})

// console.log(e.target.value)
  }

  useEffect(()=>{
    fetchitem()
  },[])


  return (
    <div className=" flex flex-col gap-5">
      <h1 className="text-xl mb-10 font-semibold mt-10">Order Page</h1>
      {orderData.map((orderval)=>(
        
 <>
 <div className="border p-3">

 <img src={parcel} alt="" />
    {    console.log(orderval)}

    <div>

     { orderval.items.map((item)=>(

      <>
      <p>{item.name} x <span>{item.quantity}</span></p>
      </>

    
     ))}
    </div>
<p>items:{orderval.items.length}</p>

    <div>
    
  Price:Rs.{orderval.amount}
    </div>

    <div>
      <p>{orderval.address.first_name}</p>
    </div>

    <div>
      <p>{orderval.address.city} <span>{orderval.address.street}</span>
      </p>
      <p>{orderval.address.phone}</p>
      <select onChange={(event)=>updatedStatus(event,orderval._id)} value={orderval.status} >
        <option value="Food processing">Food Processing</option>
        <option value="out for delivery">Out For Delivery</option>
        <option value="Delivered">Delivered</option>
      </select>
 </div>
    </div>
 </>

   
        
      ))}
    </div>
  )
}

export default Order