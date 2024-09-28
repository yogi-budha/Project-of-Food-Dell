import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../Context/StoreContext";
import "./PlaceOrder.css";
import "../Cart/Cart.css";
import Popup from "../../Components/Popup/Popup";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount,food_list,cartItem,token,mainurl } = useContext(StoreContext);
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    // country: "",
    phone: "",
  });

  const onChangeHandler = (e)=>{
    let { name,value} = e.target

    setData(()=>({...data,[name]:value}))

 
  }

  const SubmitHandler = async (e)=>{
    e.preventDefault()
    let  orderItems = []
    food_list.map((item)=>{
       
      if(cartItem[item._id]>0){

        let iteminfo = item;
        
        iteminfo["quantity"] = cartItem[item._id]

        orderItems.push(iteminfo)

      }

      
      
    })
    console.log(orderItems)

    let orderData = {
      address:data,
      items:orderItems,
      amount:(getTotalCartAmount() + 20)
    }

    await axios.post(mainurl+"/api/order/place",orderData,{headers:{token}}).then((res)=>{
    if(res.data.success){
      const {session_url} = res.data
        console.log(session_url)
      window.location.replace(session_url)
    }
    })
  }

  useEffect(()=>{
    console.log(data)
  },[data])

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div className="place-order">
        <div className="left">
          <h2>Delivery information</h2>
          <div className="multi-div">
            <input type="text" onChange={onChangeHandler} value={data.first_name} name='first_name' placeholder="First name" />
            <input type="text" placeholder="Last name" onChange={onChangeHandler} value={data.last_name} name='last_name'  />
          </div>
          <input type="email" placeholder="Email address" onChange={onChangeHandler} value={data.email} name='email'  />
          <input type="text" placeholder="Street" onChange={onChangeHandler} value={data.street} name='street'  />
          <div className="multi-div">
            <input type="text" placeholder="City" onChange={onChangeHandler} value={data.city} name='city'  />
            <input type="text" placeholder="State" onChange={onChangeHandler} value={data.state} name='state'  />
          </div>
          <div className="multi-div">
            <input type="text" placeholder="Zip code" onChange={onChangeHandler} value={data.zipCode} name='zipCode' />
            {/* <input type="text" placeholder="Country" onChange={onChangeHandler} value={data.country} name='country' /> */}
          </div>
          <input type="text" placeholder="Phone" onChange={onChangeHandler} value={data.phone} name='phone'/>
        </div>
        <div className="right">
          <h1>Cart Totals</h1>
          <div className="subtotal item-total ">
            <p>Subtotal</p>
            <p>Rs {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="delivery-fee item-total">
            <p>Delivery Fee</p>
            <p>Rs {getTotalCartAmount() == 0 ? 0 : 20}</p>
          </div>
          <hr />
          <div className=" item-total">
            {" "}
            <p>Total</p>
            <p>
              Rs {getTotalCartAmount() == 0 ? 0 : getTotalCartAmount() + 20}
            </p>
          </div>

          <button onClick={SubmitHandler}>Proceed to payment</button>
          {showPopup && (
            <Popup
              message="Done you sucessfulley payment your food & your food will be delivered you soon !!!!"
              closePopup={togglePopup}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
