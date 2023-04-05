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

const Staffer_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONENUMBER_REGEX = /^(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\\-\s]\d\d[\\-\s]\d\d|[\\-\s]\d\d[\\-\s]\d\d\d|\d{5})$/;


const AddStafferModal = (props) => {

	const [StafferName, setStaffer] = useState('');
	const [validName, setValidName] = useState(false);	
	const [StafferFocus, setStafferFocus] = useState(false);

    const [stafferRole, SetStafferRole] = useState(2);

    const handleChangeStafferRole = (event) => {
        SetStafferRole(event.target.value);
    };

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);
	
	
	const [phoneNumber, setPhoneNumber] = useState('');
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [PhoneNumberFocus, setPhoneNumberFocus] = useState(false);


  const StafferS_URL = "/api/private/Staffers"

	useEffect(() => {
		setValidName(Staffer_REGEX.test(StafferName));
	}, [StafferName]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email.toLowerCase()));
	}, [email]);

	useEffect(() => {
		setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber.toLowerCase()));
	}, [phoneNumber]);	

  const handleClose = () => {
    props.setOpen(false);
  };
  
  const handleSubmit = async () => {	
		//if button enabled with JS hack		
		const v1 = Staffer_REGEX.test(StafferName);
		const v3 = EMAIL_REGEX.test(email);
		const v4 = PHONENUMBER_REGEX.test(phoneNumber);
		
		if (!v1 || !v3 || !v4 ) {
			props.showToast("warning", 'Заполните поля правильно!');
			return;
		}
		try {
      let login = "f", pwd = "g", matchPwd = "h";
			const response = await axios.post(
				StafferS_URL,
				JSON.stringify({ StafferName, email, phoneNumber, stafferRole}),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			// TODO: remove console.logs before deployment				
			if(response?.data){
        const newStaffer = response?.data;
          props.AddNewUser(newStaffer);
      }
			
			//clear state and controlled inputs
			setStaffer('');
			setEmail('');	
			setPhoneNumber('');		
            handleClose();
		} catch (err) {
			if (!err?.response) {
				props.showToast("error", 'Сервер недоступен. Попробуйте позже.');
			} else if (err.response?.status === 409) {
				props.showToast("error", 'Такая почта или номер телефона уже используются.');
			} else {
				props.showToast("error", 'Возникла ошибка при добавлении Сотрудника!');
			}			
		}
	};

  return (
    <div>    
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>
            Добавить нового Сотрудника
          </DialogTitle>
          <DialogContent>
          <div >
          <section >           
            <form>   
              <div className="text-field">
              <label htmlFor="Staffername" className="text-field__label" for="login">
                ФИО:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !StafferName ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="Staffername" id="Staffername" placeholder="Staffer name"  
                autoComplete="off"
                onChange={(e) => setStaffer(e.target.value)}
                value={StafferName}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setStafferFocus(true)}
                onBlur={() => setStafferFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  StafferFocus && StafferName && !validName ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Все первые буквы должны быть заглавными. 
                <br />
                Строка не должна содержать цифр. 
                <br />
                В конце не должно быть пробела.
              </p>
              </div>

              <div className="text-field">
              <label htmlFor="Email" className="text-field__label" for="login">
                Email:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validEmail ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validEmail || !email ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="email" id="email" placeholder="Email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Введен неверный формат электронной почты. 
                <br />							
                Электронная почта должна быть в формате name@mail.com
              </p>
              </div>

              <div className="text-field">
              <label htmlFor="phoneNumber" className="text-field__label" for="login">
                Номер телефона:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validPhoneNumber ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validPhoneNumber || !email ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="phoneNumber" id="phoneNumber" placeholder="80335845145"
                autoComplete="off"
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                required
                aria-invalid={validPhoneNumber ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setPhoneNumberFocus(true)}
                onBlur={() => setPhoneNumberFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  PhoneNumberFocus && phoneNumber && !validPhoneNumber ? 'instructions' : 'offscreen'
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Введен неверный формат телефона 
                <br />
                Должны быть только цифры.
                <br />
                Номер должен быть в формате +378/80 xx xxx xx xx или +378/80 xx xxxxxxx
              </p>  
              </div>   
              <div className="text-field">
              <select
              className="text-field__input"
                    name="stafferRoleSelect"
                    value={stafferRole}
                    onChange={handleChangeStafferRole}
                    
                >
                    <option value="2">Администратор</option>
                    <option value="3">Мастер</option>                    
                </select>
                </div>
            </form>
          </section>
          </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Закрыть
          </Button>
          <Button disabled={!validEmail || !validPhoneNumber || !validName   ? true : false}
                  onClick={handleSubmit} color="primary" autoFocus>
           Добавить нового Сотрудника
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default AddStafferModal;