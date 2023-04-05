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

const REGEX = /^[A-zА-я0-9-_\\/\s]{2,23}$/;

const AddDeviceModal = (props) => {

	const [typeDevice, setStaffer] = useState('');
	const [validTypeDevice, setvalidTypeDevice] = useState(false);	
	const [StafferFocus, setStafferFocus] = useState(false);

    const [manufacturer, setManufacturer] = useState('');
	const [validManufacturer, setvalidManufacturer] = useState(false);	
	const [manufacturerFocus, setManufacturerFocus] = useState(false);

    const [stafferRole, SetStafferRole] = useState(2);

    const handleChangeStafferRole = (event) => {
        SetStafferRole(event.target.value);
    };

	const [model, setmodel] = useState('');
	const [validModel, setvalidModel] = useState(false);
	const [modelFocus, setmodelFocus] = useState(false);
	
	
	const [serialNumber, setserialNumber] = useState('');
	const [validSerialNumber, setvalidSerialNumber] = useState(false);
	const [serialNumberFocus, setserialNumberFocus] = useState(false);


  const DEVICES_URL = "/api/private/devices"

	useEffect(() => {
		setvalidTypeDevice(REGEX.test(typeDevice));
	}, [typeDevice]);

	useEffect(() => {
		setvalidModel(REGEX.test(model.toLowerCase()));
	}, [model]);

	useEffect(() => {
		setvalidSerialNumber(REGEX.test(serialNumber.toLowerCase()));
	}, [serialNumber]);	
	
    useEffect(() => {
		setvalidManufacturer(REGEX.test(manufacturer.toLowerCase()));
	}, [manufacturer]);	

  const handleClose = () => {
    props.setOpen(false);
  };
  
  const handleSubmit = async () => {	
		//if button enabled with JS hack		
		const v1 = REGEX.test(typeDevice);
		const v3 = REGEX.test(model);
		const v4 = REGEX.test(serialNumber);
		const v2 = REGEX.test(manufacturer);
		
		if (!v1 || !v2 || !v3 || !v4 ) {
			props.showToast("warning", 'Заполните поля правильно!');
			return;
		}
		try {
			const response = await axios.post(
				DEVICES_URL,
				JSON.stringify({ typeDevice, model, serialNumber, manufacturer}),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			// TODO: remove console.logs before deployment				
			if(response?.data){
                const newDevice = response?.data;
                props.AddNewDevice(newDevice);
            }
			
			//clear state and controlled inputs
			setStaffer('');
			setmodel('');	
			setserialNumber('');		
			setManufacturer('');		
            handleClose();
		} catch (err) {
			if (!err?.response) {
				props.showToast("error", 'Сервер недоступен. Попробуйте позже.');
			} else if (err.response?.status === 409) {
				props.showToast("error", 'Такая устройство уже существует.');
			} else {
				props.showToast("error", 'Возникла ошибка при добавлении устройства!');
			}			
		}
	};

  return (
    <div>    
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>
            Добавить новое устройство
          </DialogTitle>
          <DialogContent>
          <div >
          <section >           
            <form>   
              <div className="text-field">
              <label htmlFor="typeDevice" className="text-field__label" for="login">
                Тип устройства
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validTypeDevice ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validTypeDevice || !typeDevice ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="typeDevice" id="typeDevice" placeholder="laptop"  
                autoComplete="off"
                onChange={(e) => setStaffer(e.target.value)}
                value={typeDevice}
                required
                aria-invalid={validTypeDevice ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setStafferFocus(true)}
                onBlur={() => setStafferFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  StafferFocus && typeDevice && !validTypeDevice ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должны быть только цифры и буквы длиной 2-23 символа.
              </p>
              </div>

              <div className="text-field">
              <label htmlFor="model" className="text-field__label" for="login">
                Модель
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validModel ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validModel || !model ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="model" id="model" placeholder="model"
                autoComplete="off"
                onChange={(e) => setmodel(e.target.value)}
                value={model}
                required
                aria-invalid={validModel ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setmodelFocus(true)}
                onBlur={() => setmodelFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  modelFocus && model && !validModel ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должны быть только цифры и буквы длиной 2-23 символа.
              </p>
              </div>

              <div className="text-field">
              <label htmlFor="serialNumber" className="text-field__label" for="login">
                Серийный номер
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validSerialNumber ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validSerialNumber || !serialNumber ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="serialNumber" id="serialNumber" placeholder="FSW3294JL"
                autoComplete="off"
                onChange={(e) => setserialNumber(e.target.value)}
                value={serialNumber}
                required
                aria-invalid={validSerialNumber ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setserialNumberFocus(true)}
                onBlur={() => setserialNumberFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  serialNumberFocus && serialNumber && !validSerialNumber ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должны быть только цифры и буквы длиной 2-23 символа.
              </p>  
              </div>      
              <div className="text-field">
              <label htmlFor="manufacturer" className="text-field__label" for="login">
                Производитель
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validManufacturer ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validManufacturer || !model ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="manufacturer" id="manufacturer" placeholder="Asus"
                autoComplete="off"
                onChange={(e) => setManufacturer(e.target.value)}
                value={manufacturer}
                required
                aria-invalid={validManufacturer ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setManufacturerFocus(true)}
                onBlur={() => setManufacturerFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  manufacturerFocus && manufacturer && !validManufacturer ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Должны быть только цифры и буквы длиной 2-23 символа.
              </p>  
              </div>              
            </form>
          </section>
          </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Закрыть
          </Button>
          <Button disabled={!validModel || !validSerialNumber || !validTypeDevice   ? true : false}
                  onClick={handleSubmit} color="primary" autoFocus>
           Добавить новое устройство
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default AddDeviceModal;