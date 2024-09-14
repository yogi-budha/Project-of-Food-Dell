import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { food_list, cartItem, setCartItem, addToCart, removeToCart,getTotalCartAmount,mainurl } = useContext(StoreContext);
  const navigate = useNavigate()
  return (
    <div className="Cart">
      <div className="cart-content">
        <div className="cart-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((data, i) => {
          // console.log(cartItem.data._id)
          if (cartItem[data._id] > 0) {
            return (
              <>
                {' '}
                <div key={i} className="cart-title cart-item">
                  <img src={`${mainurl}/image/${data.image}`} alt="" />
                  <p>{data.name}</p>
                  <p>Rs {data.price}</p>
                  <p>{cartItem[data._id]}</p>
                  <p>Rs {data.price * cartItem[data._id]}</p>
                  <p className="remove" onClick={() => removeToCart(data._id)}>
                    x
                  </p>
                </div>
                <hr />
              </>
            );
          }
        })}
      </div>
      <div className="container">
        <div className="left">
          <h1>Cart Totals</h1>
          <div className="subtotal item-total ">
            <p>Subtotal</p>
            <p>Rs {getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="delivery-fee item-total">
            <p>Delivery Fee</p>
            <p>RS {getTotalCartAmount()==0?0:20}</p>
          </div>
          <hr />
          <div className=" item-total">
            {' '}
            <p>Total</p>
            <p>Rs {getTotalCartAmount()==0?0:getTotalCartAmount()+20}</p>
          </div>

          <button onClick={()=>navigate("/Order")}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="right">
          <p>If you have a promo code.Enter it here</p>
          <div className="input-item">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
