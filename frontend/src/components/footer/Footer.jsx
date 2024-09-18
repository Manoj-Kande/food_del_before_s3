import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer' >
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt recusandae culpa veniam. Saepe modi provident ab, velit error ipsa vel nemo laborum molestiae cum maxime porro eum itaque aliquid. Recusandae.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
            </div>
            <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-121-354-2580</li>
                        <li>contact@mywebsite.com</li>
                    </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright' >Copyright 2024 © -  All Rights Reserved.</p>
    </div>
  )
}

export default Footer