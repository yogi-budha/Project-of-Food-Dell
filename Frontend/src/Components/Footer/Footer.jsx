import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import logo3 from '../../assets/foodExpress.jpg'

function Footer() {
  return (
    <div className="footer" id='footer'>
        <div className="footer-content">
            <div className="footer-left">

            
            <img className='firstimg' src={logo3} alt="" />
            <p>Nepal Food Express - Your Gateway to Flavors of Nepal</p>
            <div className='icon'>
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
            </div>
            </div>
            <div className="footer-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className='footer-right'>
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>984799999</li>
                    <li>contact@nepalfoodexpress.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>Copyright 2024 © Neapl Food Express; All rights reserved.
        </p>
    </div>
  )
}

export default Footer