import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import './FoodCard.css';
import { StoreContext } from '../../Context/StoreContext';
const FoodCard = ({ id, name, price, image, catagory, description }) => {
  const { cartItem, setCartItem, addToCart, removeToCart, food_list,mainurl} =
    useContext(StoreContext);
  return (
    <>
      <div key={id} className="food-card-container">
        <div className="food-item-image">
          <img className='imagevalcard' src={`${mainurl}/image/${image}`} alt="" />
          <div className="icon-img">
            {!cartItem[id] ? (
              <div className="icon-white">
                {' '}
                <img
                  onClick={() => addToCart(id)}
                  src={assets.add_icon_white}
                  alt=""
                />
              </div>
            ) : (
              <div className="add-remove-item">
                <img
                  onClick={() => removeToCart(id)}
                  src={assets.remove_icon_red}
                  alt=""
                />
                <p>{cartItem[id]}</p>
                <img
                  onClick={() => addToCart(id)}
                  src={assets.add_icon_green}
                  alt=""
                />
              </div>
            )}
          </div>
        </div>

        <div className="info">
          <div className="upper-info">
            <p>{name}</p>

            <img src={assets.rating_starts} alt="" />
          </div>
          <div className="lower-info">
            <p>{description}</p>
            <h2>Rs {price}</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodCard;
