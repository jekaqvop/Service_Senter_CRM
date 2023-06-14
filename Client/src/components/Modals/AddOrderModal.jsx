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
import Multiselect from 'multiselect-react-dropdown';
import ToggleButton from 'react-toggle-button'
import Select from "react-select";
import { Check, X } from 'react-bootstrap-icons';
import AddDeviceModal from './AddDeviceModal';
import { Link } from 'react-router-dom';
import AddUserModal from './AddUserModal';


const Order_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;

const REGEX = /^[A-zА-я0-9-_\\/\s]{2,200}$/;
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
	const [descriptionFocus, setdescriptionFocus] = useState(false);

  const [reasonContacting, setReasonContacting] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [appearance, setAppearance] = useState([]);
  const [isUrgently, setIsUrgently] = useState(false);

  const [openAddDevice, setOpenAddDevice] = useState(false);
  const [openAddClient, setOpenAddClient] = useState(false);

  const [isDisabeButton, setIsDisableButton] = useState(false);

  const AppearanceOptions = [
    { label: "Следы эксплуатации", value: "Следы эксплуатации"},
    { label: "Потёртости", value: "Потёртости"},
    { label: "Мелкие царапины", value: "Мелкие царапины"},
    { label: "Царапины", value: "Царапины"},
    { label: "Сколы на корпусе", value: "Сколы на корпусе"},
    { label: "Трещины на корпусе", value: "Трещины на корпусе"},
    { label: "Сломаны крепления экрана", value: "Сломаны крепления экрана"},
    { label: "Вмятины на корпусе", value: "Вмятины на корпусе"}
  ]

  const EquipmentOptions = [
    { label: "Без дополнений", value: "Без дополнений"},
    { label: "Чехол", value: "Чехол"},
    { label: "Сим-карта", value: "Сим-карта"},
    { label: "Сумка", value: "Сумка"},
    { label: "Аккумулятор", value: "Аккумулятор"},
    { label: "Зарядное устройство", value: "Зарядное устройство"}
  ];

  const ReasonContactingOptions = [
    { label: "не включается", value: "не включается"},
    { label: "нет изображения на экране", value: "нет изображения на экране"},
    { label: "залит", value: "залит"},
    { label: "уронили", value: "уронили"},
    { label: "разбита матрица", value: "разбита матрица"},
    { label: "не работает от блока питания", value: "не работает от блока питания"},
    { label: "артефакты на экране", value: "артефакты на экране"},
    { label: "не работает клавиатура", value: "не работает клавиатура"},    
    { label: "перегревается", value: "перегревается"},
    { label: "зависает", value: "зависает"},
    { label: "выключается во время работы", value: "выключается во время работы"},
    { label: "не загружается ОС", value: "не загружается ОС"},
    { label: "шумит система охлаждения", value: "шумит система охлаждения"},
    { label: "не видит жесткий диск", value: "не видит жесткий диск"},
    { label: "искажение изображения", value: "искажение изображения"},
    { label: "нет подсветки экрана", value: "нет подсветки экрана"},
    { label: "не работает тачпад", value:  "не работает тачпад"},
    { label: "не заряжает аккумулятор", value: "не заряжает аккумулятор"},
    { label: "нет звука в динамиках", value: "нет звука в динамиках"}
  ];

  const onSelectReasonContacting = (selectedList, selectedItem) => {
      setReasonContacting(selectedList);
  }

  const onRemoveReasonContacting = (selectedList, removedItem) => {
      setReasonContacting(selectedList);
  }

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
 
    useEffect(() => {
		setvalidDescription(REGEX.test(description));
    
    setIsDisableButton(((validDescription || description !== '') && selectDevice && 
    selectUser && appearance.length > 0 && equipment.length > 0 && reasonContacting.length > 0) ? false : true);
          

	}, [appearance, description, equipment, reasonContacting, selectDevice, selectUser, validDescription]);


  const handleClose = () => {
    props.setOpen(false);
  };

  const getStr = (strs) =>{
    let str = "";
    strs.map((item, index)=>{ return str += item.value + (strs.lenght - 1 === index ? "" : ", ")});
    return str;
  }
  
  const handleSubmit = async () => {	
    //if button enabled with JS hack
    const check = ((validDescription || description !== '') && selectDevice && 
    selectUser && appearance.length > 0 && equipment.length > 0 && reasonContacting.length > 0) ? false : true		;
    const v1 = REGEX.test(description);
    if (!v1 || check) {
        props.showToast("warning", 'Заполните поля правильно!');
        return;
    }
    try {    
      
        const response = await axios.post(
            OrderS_URL,
            JSON.stringify({ description: description, selectDevice:  selectDevice.id, 
              selectUser: selectUser.id, reasonContacting: getStr(reasonContacting), 
              equipment: getStr(equipment), appearance: getStr(appearance), isUrgently: isUrgently}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            }
        );
        console.log("заказ сделан");		
        if(response?.data){
    const newOrder = response?.data;
      props.AddNewOrder(newOrder);
  }
        
        //clear state and controlled inputs
        setDevices(Devices.filter(d => selectDevice.id !== d.id));
        setUsers(users.filter(u => selectUser.id !== u.id));
        setSelectDevice(null);
        setSelectUser(null);
        setdescription('');
        setAppearance([]);
        setIsUrgently(false);
        setEquipment([]);
        setReasonContacting([]);        
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

const [inputReasonContacting, setInputReasonContacting] = useState();
const [inputEquipment, setInputEquipment] = useState();
const [inputAppearance, setInputAppearance] = useState();

const AddSelectDevice = (selectDevice) =>{
  setDevices(prevState => [...prevState, selectDevice]);
  setSelectDevice(selectDevice);
}

const AddSelectUser = (selectUser) =>{
  setUsers(prevState => [...prevState, selectUser]);
  setSelectUser(selectUser);
}

  return (
    <div id='height-max50'>    
        <Dialog open={props.open} onClose={handleClose} >
          <DialogTitle>
          Создание заказа
          </DialogTitle>
          <DialogContent style={{width: "500px", height: "600px"}}>
          <div >  
            <div >
            <section >           
              <form>
                <div classDescription="text-field">                
                    
                  <label htmlFor="OrderDescription" classDescription="text-field__label" for="login">
                    Устройство:
                  </label>
                  <Button style={{float: "right"}} onClick={()=> setOpenAddDevice(true)}>Добавить новое устройство</Button>
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
            <div className="text-field" style={{marginTop: '15px'}}>
              <label htmlFor="OrderDescription" classDescription="text-field__label" for="client">
                    Клиент:
                </label>
                <Button style={{float: "right"}} onClick={()=> setOpenAddClient(true)}>Добавить нового клиента</Button>
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
                  <div className='text-field'>
                    <label htmlFor="OrderDescription" className="text-field__label" for="idClient">
                      Причина обращения
                    </label>             
                      <Select
                        options={ReasonContactingOptions}
                        isMulti
                        value={reasonContacting}
                        inputValue={inputReasonContacting}
                        onInputChange={(inputValue) => setInputReasonContacting(inputValue)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && inputReasonContacting.trim() !== "") {
                            const newOption = { label: inputReasonContacting, value: inputReasonContacting };
                            setReasonContacting([...reasonContacting, newOption]);
                            setInputReasonContacting("");
                          }
                        }}
                        onChange={(selectedOptions) => setReasonContacting(selectedOptions)}
                        placeholder="Выберите или введите значение"
                      />
                  </div>               
                  <div className="text-field">
                      <label htmlFor="description" className="text-field__label" for="login">
                        Комплектация                    
                      </label>
                      <Select
                        options={EquipmentOptions}
                        isMulti
                        value={equipment}
                        inputValue={inputEquipment}
                        onInputChange={(inputValue) => setInputEquipment(inputValue)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && inputEquipment.trim() !== "") {
                            const newOption = { label: inputEquipment, value: inputEquipment };
                            setEquipment([...equipment, newOption]);
                            setInputEquipment("");
                          }
                        }}
                        onChange={(selectedOptions) => setEquipment(selectedOptions)}
                        placeholder="Выберите или введите значение"
                      />                  
                  </div>
                  <div className="text-field">
                      <label htmlFor="description" className="text-field__label" for="login">
                        Состояние                    
                      </label>
                      <Select
                        options={AppearanceOptions}
                        isMulti
                        value={appearance}
                        inputValue={inputAppearance}
                        onInputChange={(inputValue) => setInputAppearance(inputValue)}
                        
                        onKeyDown={(event) => {
                          if (event.key === "Enter" && inputAppearance.trim() !== "") {
                            const newOption = { label: inputAppearance, value: inputAppearance };
                            setAppearance([...appearance, newOption]);
                            setInputAppearance("");
                          }
                        }}
                        onChange={(selectedOptions) => setAppearance(selectedOptions)}
                        placeholder="Выберите или введите значение"
                        styles={{
                          menuPortal: base => ({ ...base, height: '10px' })
                        }}
                      />                  
                  </div>
                  <div className='text-field'>
                    <div style={{display: "flex", "flex-direction": "row"}}>
                       <ToggleButton
                    inactiveLabel={<X/>}
                    activeLabel={<Check/>}
                    value={isUrgently}
                    onToggle={(value) => {
                      setIsUrgently(!isUrgently)
                    }} /> <text style={{ "margin-left": "20px"}}>Срочно</text>
                    </div>                 
                  </div>
                  <div className="text-field" >
                    <label htmlFor="description" className="text-field__label" for="login" >
                      Комментарий
                      <FontAwesomeIcon
                        icon={faCheck}
                        className={validDescription ? 'valid' : 'hide'}
                      />
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={validDescription || !description ? 'hide' : 'invalid'}
                      />
                    </label>
                    <textarea 
                      className="text-field__input" type="text" name="description" id="description" placeholder="description"
                      autoComplete="off"
                      onChange={(e) => setdescription(e.target.value)}
                      value={description}
                      required
                      aria-invalid={validDescription ? 'false' : 'true'}
                      aria-describedby="uidnote"
                      onFocus={() => setdescriptionFocus(true)}
                      onBlur={() => setdescriptionFocus(false)}
                      style={{height: "70px",wordWrap: 'break-word',lineHeight: '1.5', padding: '10px',width: '100%', whiteSpace: 'pre-wrap'}}
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
                </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Закрыть
          </Button>
          <Button disabled={isDisabeButton}
                  onClick={handleSubmit} color="primary" autoFocus>
           Создать заказ
          </Button>
        </DialogActions>
      </Dialog>
      <AddDeviceModal open={openAddDevice}
                              setOpen={setOpenAddDevice}
                              showToast={props.showToast}
                              AddNewDevice={AddSelectDevice}
                />      
      <AddUserModal open={openAddClient}
                    setOpen={setOpenAddClient}
                    showToast={props.showToast}
                    AddNewUser={AddSelectUser}
      />      
    </div>
  );
}
  
export default AddOrderModal;