import React, { useContext, useEffect, useState } from 'react'

import './Verify.css'
import { StoreContext } from "../../context/StoreContext";
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {  toast } from 'react-toastify';


const Verify = () => {

    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const user_Id = searchParams.get("user_Id");
    const {url}=useContext(StoreContext);
    const navigate =useNavigate();

    const verifyPayment =async ()=>{
      const response=await axios.get(url+"/api/order/verify",{success,orderId,user_Id})
      
      if(response.data.success){
        console.log("order placed successfully");
        navigate("/myorders");
        toast.success("Order Placed Successfully");
      }else{
        toast.error("Order Failed");
        navigate("/");
      }
      
    }

    useEffect(()=>{
        {
          console.log("Entered into Verify Page");
        }
        verifyPayment();
    },[]);

  return (
    <div className='verify' >
      <div className="spinner">

      </div>
    </div>
  )
}

export default Verify