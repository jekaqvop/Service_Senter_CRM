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
import './CSS/AddUsersModal.css';

const Order_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;

const REGEX = /^[A-zА-я0-9-_\\/\s]{2,23}$/;
const USERS_URL = "/api/private/Users";
const DEVICES_URL = "/api/private/Devices/notuse" ;
const OrderS_URL = "/api/private/Orders"

const AddOrderModal = (props) => {    

    const [Devices, setDevices] = useState([]);
    const [selectDevice, setSelectDevice] = useState(null);
    const [users, setUsers] = useState([]);
    const [selectUser, setSelectUser] = useState(null);
    
	const [description, setdescription] = useState('');
	const [validDescription, setvalidDescription] = useState(false);
	const [descriptionFocus, setdescriptionFocus] = useState(false)
  const loadUsers = async (e) => {
    try{
       const response = await axios.get(
          USERS_URL,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
      );  
      setUsers(response.data);          
     
    }catch(err){
     
    }         
  }
  const loadDevices = async (e) => {
    try{
       const response = await axios.get(
        DEVICES_URL,
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
      );  
      setDevices(response.data);          
    
    }catch(err){
     
    }         
  }    
    useEffect(()=>{
        loadDevices();
       
        loadUsers();
      
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, []);

  const handleChangeUsers = (event) => {
      setSelectUser(event.target.value);
  };
  const handleChangeDevice = (event) => {
      setSelectDevice(event.target.value);
  };
;
    useEffect(() => {
		setvalidDescription(REGEX.test(description));
	
	}, [description]);


  const handleClose = () => {
    props.setOpen(false);
  };
  
  const handleSubmit = async () => {	
    //if button enabled with JS hack		
    const v1 = REGEX.test(description);
    if (!v1) {
        props.showToast("warning", 'Заполните поля правильно!');
        return;
    }
    try {    
      console.log(JSON.stringify({Description: description, SelectDevice:  selectDevice.id, SelectUser: selectUser.id}));
        const response = await axios.post(
            OrderS_URL,
            JSON.stringify({ description, selectDevice:  selectDevice.id, selectUser: selectUser.id}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        // TODO: remove console.logs before deployment				
        if(response?.data){
    const newOrder = response?.data;
      props.AddNewOrder(newOrder);
  }
        
        //clear state and controlled inputs
        setdescription('');
        
        handleClose();
    } catch (err) {
        if (!err?.response) {
            props.showToast("error", 'Сервер недоступен. Попробуйте позже.');
        } else if (err.response?.status === 409) {
            props.showToast("error", 'Ошибка');
        } else {
            props.showToast("error", 'Возникла ошибка при создании заказа!');
        }			
    }
};
  return (
    <div id='height-max50'>    
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>
          Создание заказа
          </DialogTitle>
          <DialogContent>
          <div >
          <section >           
            <form>               
              <div className="text-field">
              <label htmlFor="description" className="text-field__label" for="login">
                Описание поломки
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validDescription ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validDescription || !description ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="description" id="description" placeholder="description"
                autoComplete="off"
                onChange={(e) => setdescription(e.target.value)}
                value={description}
                required
                aria-invalid={validDescription ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setdescriptionFocus(true)}
                onBlur={() => setdescriptionFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  descriptionFocus && description && !validDescription ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должны быть только цифры и буквы длиной 2-23 символа.
              </p>
              </div>
              <div classDescription="text-field">
                <label htmlFor="OrderDescription" classDescription="text-field__label" for="login">
               Устройство:
             
                
              </label>
              <Picky
                        options={Devices}
                        labelKey="serialNumber"                       
                        valueKey="id"
                        multiple={false}
                        includeFilter                       
                        value={selectDevice}                        
                        onChange={setSelectDevice}
                        render={({
                            style,
                            isSelected,
                            item,
                            selectValue,
                            labelKey,                           
                            valueKey,
                            multiple,
                          }) => {
                            return (
                              <li
                              style={style}  
                                className={(isSelected ? 'selected' : '') } 
                                key={item[valueKey]} // required
                                onClick={() => selectValue(item)}
                              >                               
                                <input type="radio" checked={isSelected} readOnly />
                                <span >{item[labelKey] + " " + item["model"] + " " + item["typeDevice"]}</span>
                              </li>
                            );
                          }}
                        />                                   
                </div>
                         
            </form>
          </section>
          </div>
          <div className="text-field">
              <label htmlFor="OrderDescription" className="text-field__label" for="idClient">
              Клиент
              </label>
              <Picky
                        options={users}
                        labelKey="userName"                       
                        valueKey="id"
                        multiple={true}
                        includeFilter                       
                        value={selectUser}                        
                        onChange={setSelectUser}
                        render={({
                            style,
                            isSelected,
                            item,
                            selectValue,
                            labelKey,                           
                            valueKey,
                          }) => {
                            return (
                              <li
                              style={style} 
                                key={item[valueKey]} // required
                                onClick={() => selectValue(item)}
                              >                               
                                <input type="radio" checked={isSelected} readOnly />
                                <span >{item[labelKey] + " " + item["phoneNumber"]}</span>
                              </li>
                            );
                          }}
                        />
                </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Закрыть
          </Button>
          <Button disabled={!validDescription ? true : false}
                  onClick={handleSubmit} color="primary" autoFocus>
           Создать заказ
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default AddOrderModal;