import React from 'react';
import './popup.css'
const Popup = ({ message, closePopup }) => {
  return (
    <div className="popup">
      <div className="popup-inner">

        <h1>you successfully paid !!!  </h1>
        <p>your products is deliverd to you soon!!!</p>
      </div>
    </div>
  );
};

export default Popup;
