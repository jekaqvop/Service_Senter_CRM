import React from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./CSS/AddUsersModal.css";
import axios from '../../api/axios';
import { Picky } from 'react-picky';
import Preloader from '../Preloader/Preloader';
import Multiselect from 'multiselect-react-dropdown';

const Order_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;

const REGEX = /^[A-zА-я0-9-_\\/\s]{2,23}$/;
const OrderS_URL = "/api/private/Orders"

const DetailsOrder = (props) => {    
    const [order, setOrder] = useState({});   
    const [isLoading, setIsLoading] = useState(true); 
 
    const loadOrder = async (e) => {
        try{
           const response = await axios.get(
              OrderS_URL + "/" + props.idOrder,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
          setOrder(response.data); 
          setIsLoading(false);
        }catch(err){
         
        }         
      }

      const SERVICES_URL = "/api/Services";
      const [services, setServices] = useState([]);
      const [selectedServices, setSelectedServices] = useState([]);
      
      const loadServPerf = async (e) => {
        try{
           const response = await axios.get(
              OrderS_URL + "/ServPerf/" + props.idOrder,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
          setSelectedServices(response.data); 
          setIsLoading(false);          
        }catch(err){
         props.showToastFiveSec('error', 'Не удалось загрузить применяемые услуги');
        }         
      }

      const loadServices = async (e) => {
        try{
           const response = await axios.get(
              SERVICES_URL,
              {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
              }
          );  
          setServices(response.data); 
        }catch(err){
            console.log(err);
            props.showToastFiveSec('error', 'Не удалось загрузить список услуг');
        }         
      };

      useEffect(()=>{
        loadServices();      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
 
    useEffect(()=>{
        if(props.open) {
          loadOrder();     
          loadServPerf();
        }
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [props.open]);


  const handleClose = () => {
    props.setOpen(false);
  }; 

  const saveChangeOrder = async (e) => {
    try{
      let strParams = "";
      selectedServices.forEach(element => {
        strParams += "param" + element.id + "=" + element.id + "&";
      });    
      //strParams[strParams.length - 1] = "";
      let add_serv_perf_url = "/api/private/Orders/setvicePerfomed?" + strParams;
      const response = await axios.post(
        add_serv_perf_url,
        JSON.stringify({id_order: props.idOrder}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
    );
      //setServices(response.data); 
      props.showToast("success", 'Услуги применены!');
    }catch(err){
        console.log(err);
        props.showToast('error', 'Не удалось применить услуги к заказу');
    }         
  };

const onSelect = (selectedList, selectedItem) => {
    setSelectedServices(selectedList);
}

const onRemove = (selectedList, removedItem) => {
    setSelectedServices(selectedList);
}

  return (
    <div id='height-max80'>    
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>
          Информация о заказе
          </DialogTitle>
          <DialogContent>
          {isLoading ? (<Preloader/>) : (
          <div >            
          <div  className="box">
                <div className="media">         
                <div className="media-content">
                    <b style={{ textTransform: "capitalize" }}>
                    Заказ №{order.id}{" "}
                     <span id="bagroundBlue" className="tag is-primary">Цена {order.priceOrder + " р"}</span>
                    </b>
                    {order.device ? <>
                      <div>Тип устройства: {order.device.typeDevice}</div>           
                      <div>Модель: {order.device.model}</div>           
                      <div>Серийный номер: {order.device.serialNumber}</div>           
                      <div>Производетиель: {order.device.manufacturer}</div>       
                    </>: <></> }
                        
                    <div className="is-clearfix">
                        <div>
                        ФИО мастера: {!order.master ? "не существует" : order.master.userName}
                        </div>
                        <div>
                        Номер телефона матера: {!order.master ? "не существует" : order.master.phoneNumber}
                        </div>
                        <div>
                        Email матера: {!order.master ? "не существует" : order.master.email}
                        </div>
                        <div>
                        Логин матера: {!order.master ? "не существует" : order.master.login}
                        </div>
                        <br/>
                          <div>
                        ФИО клиента: {!order.client ? "не существует" : order.client.userName}
                        </div>
                        <div>
                        Номер телефона клиента: {!order.client ? "не существует" : order.client.phoneNumber}
                        </div>
                        <div>
                        Email клиента: {!order.client ? "не существует" : order.client.email}
                        </div>
                        <div>
                        Логин клиента: {!order.client ? "не существует" : order.client.login}
                        </div>
                    <div>
                      <br/>

                        <br/>
                    Применяемые услуги
                    <Multiselect
                    options={services} // Options to display in the dropdown
                    selectedValues={selectedServices}
                    onSelect={onSelect} // Function will trigger on select event
                    onRemove={onRemove} // Function will trigger on remove event
                    displayValue="title" // Property name to display in the dropdown options
                    />
                    <br/>
                    Дата принятия в сервис: { new Date(order.date_acceptance).getDate() + "."
                        + (new Date(order.date_acceptance).getMonth()+1)  + "." 
                        + new Date(order.date_acceptance).getFullYear() + " "  
                        + new Date(order.date_acceptance).getHours() + ":"  
                        + new Date(order.date_acceptance).getMinutes() + ":" 
                        + new Date(order.date_acceptance).getSeconds()}
                    </div>
                    <div>
                    Дата начала ремонта: {!order.repair_start_date ? ("не начат") : (
                                                new Date(order.repair_start_date).getDate() + "."
                        + (new Date(order.repair_start_date).getMonth()+1)  + "." 
                        + new Date(order.repair_start_date).getFullYear() + " "  
                        + new Date(order.repair_start_date).getHours() + ":"  
                        + new Date(order.repair_start_date).getMinutes() + ":" 
                        + new Date(order.repair_start_date).getSeconds())}
                    </div>
                    <div>
                    Дата завершения ремонта: {!order.repair_completion_date ? ("не завершён") : (
                                                new Date(order.repair_completion_date).getDate() + "."
                        + (new Date(order.repair_completion_date).getMonth()+1)  + "." 
                        + new Date(order.repair_completion_date).getFullYear() + " "  
                        + new Date(order.repair_completion_date).getHours() + ":"  
                        + new Date(order.repair_completion_date).getMinutes() + ":" 
                        + new Date(order.repair_completion_date).getSeconds())}
                    </div>
                    <div>
                    Дата выдачи: {!order.date_issue ? ("не выдан") : (
                                                new Date(order.date_issue).getDate() + "."
                        + (new Date(order.date_issue).getMonth()+1)  + "." 
                        + new Date(order.date_issue).getFullYear() + " "  
                        + new Date(order.date_issue).getHours() + ":"  
                        + new Date(order.date_issue).getMinutes() + ":" 
                        + new Date(order.date_issue).getSeconds())}
                    </div>              
                    <div>
                      Статус заказа: {order.status}
                    </div>
                    <br/>
                    <div>
                      Статус заказа: {order.status}
                    </div>
                    </div>                   
                </div>               
                </div>
            </div>
          </div>)}
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Закрыть
          </Button>
          <Button 
                  onClick={()=> saveChangeOrder()} color="primary" autoFocus>
          Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default DetailsOrder;