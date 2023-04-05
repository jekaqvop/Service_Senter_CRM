import React, { useEffect, useState } from 'react'
import axios from '../api/axios';
import ServiceItem from '../components/ServiceItem';
import "./CSS/Services.css"
import 'bulma/css/bulma.css';
import Button from '@material-ui/core/Button';
import AddServices from '../components/AddService/AddService';
import Preloader from '../components/Preloader/Preloader';
import MyOrderItem from '../components/MyOrderItem';

const ORDERS_URL = "/api/private/AccountPrivateData";

const MyOrders = (props) =>{
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const [open, setOpen] = useState(false);
    const loadServices = async (e) => {
      try{
         const response = await axios.get(
            ORDERS_URL + "/myOrders",
            {
              headers: { 'Content-Type': 'application/json' },
              withCredentials: true,
            }
        );  
        setOrders(response.data);          
        setLoading(false);   
      }catch(err){
        setLoading(false);
      }         
    };
    useEffect(()=>{
        setLoading(true);          
        loadServices();       
       }, []);

       const showToastFiveSec = (type, description) =>{
   
        props.showToast(type, "top-right", true, 5000, !description ? "Error" : description);
      }

    

       return(
        <>
            {loading ? (
            <Preloader/>) : (
            <> 
                  <div id="bagroundBlue" className="hero is-primary">
              <div className="hero-body container">
                <h4 className="title">Заказы</h4>
              </div>
            </div>
            <br />
            <div className="container">
              <div className="column is-multiline">
             <div id='maxWidth'>
                {orders && orders.length ? (
                  orders.map((order, index) => (
                    <MyOrderItem
                      order={order}
                      key={index}
                      addToCart={()=> console.log("adding")}
                    />
                  ))
                ) : (
                  <div className="column">
                    <span className="title has-text-grey-light">
                      Заказы не найдены
                    </span>
                  </div>
                )}
                </div>
              </div>
            </div>  
            </>
            )
            }
        </>
       );
}


export default MyOrders;
