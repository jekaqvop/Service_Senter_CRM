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

const USER_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONENUMBER_REGEX = /^(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\\-\s]\d\d[\\-\s]\d\d|[\\-\s]\d\d[\\-\s]\d\d\d|\d{5})$/;


const AddUserModal = (props) => {

	const [userName, setUser] = useState('');
	const [validName, setValidName] = useState(false);	
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);
	
	
	const [phoneNumber, setPhoneNumber] = useState('');
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [PhoneNumberFocus, setPhoneNumberFocus] = useState(false);


  const USERS_URL = "/api/Users"

	useEffect(() => {
		setValidName(USER_REGEX.test(userName));
	}, [userName]);

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
		const v1 = USER_REGEX.test(userName);
		const v3 = EMAIL_REGEX.test(email);
		const v4 = PHONENUMBER_REGEX.test(phoneNumber);
		
		if (!v1 || !v3 || !v4 ) {
			props.showToast("warning", 'Заполните поля правильно!');
			return;
		}
		try {
      let login = "f", pwd = "g", matchPwd = "h";
			const response = await axios.post(
				USERS_URL,
				JSON.stringify({ login, userName, email, phoneNumber, pwd, matchPwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			// TODO: remove console.logs before deployment
			console.log(JSON.stringify(response?.data));			
			if(response?.data){
        const newUser = response?.data;
          props.AddNewUser(newUser);
      }
			
			//clear state and controlled inputs
			setUser('');
			setEmail('');	
			setPhoneNumber('');		
      handleClose();
		} catch (err) {
			if (!err?.response) {
				props.showToast("error", 'Сервер недоступен. Попробуйте позже.');
			} else if (err.response?.status === 409) {
				props.showToast("error", 'Такая почта или номер телефона уже используются.');
			} else {
				props.showToast("error", 'Возникла ошибка при добавлении пользователя!');
			}			
		}
	};

  return (
    <div>    
        <Dialog open={props.open} onClose={handleClose}>
          <DialogTitle>
            Добавить нового пользователя
          </DialogTitle>
          <DialogContent>
          <div >
          <section >           
            <form>   
              <div className="text-field">
              <label htmlFor="username" className="text-field__label" for="login">
                ФИО:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={validName ? 'valid' : 'hide'}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={validName || !userName ? 'hide' : 'invalid'}
                />
              </label>
              <input
                className="text-field__input" type="text" name="username" id="username" placeholder="User name"  
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={userName}
                required
                aria-invalid={validName ? 'false' : 'true'}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
              <p
                id="uidnote"
                className={
                  userFocus && userName && !validName ? 'instructions' : 'offscreen'
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
            </form>
          </section>
          </div>
        </DialogContent>
        <DialogActions>
          <Button  onClick={handleClose} color="primary">
           Close
          </Button>
          <Button disabled={!validEmail || !validPhoneNumber || !validName   ? true : false}
                  onClick={handleSubmit} color="primary" autoFocus>
           Добавить нового пользователя
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
export default AddUserModal;