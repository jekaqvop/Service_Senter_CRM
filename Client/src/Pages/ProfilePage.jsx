import React, { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { Navigate } from 'react-router-dom';
import "./CSS/ProfilePage.css";
import '../index.css';
import { Button } from 'react-bootstrap';

const LOGIN_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONENUMBER_REGEX = /^(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\\-\s]\d\d[\\-\s]\d\d|[\\-\s]\d\d[\\-\s]\d\d\d|\d{5})$/;
const UPDATEDATAUSER_URL = '/api/private/AccountPrivateData';



const ProfilePage = (props) => {
   const userRef = useRef();
	const errRef = useRef();
   const [loading, setLoading] = useState(true);

	const [userName, setUser] = useState('');
	const [validName, setValidName] = useState(false);	
	const [userFocus, setUserFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);
	
	const [login, setLogin] = useState('');
	const [validLogin, setValidLogin] = useState(false);
	const [loginFocus, setLoginFocus] = useState(false);
	
	const [phoneNumber, setPhoneNumber] = useState('');
	const [validPhoneNumber, setValidPhoneNumber] = useState(false);
	const [PhoneNumberFocus, setPhoneNumberFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [validPwd, setValidPwd] = useState(false);
	const [pwdFocus, setPwdFocus] = useState(false);

	const [oldpwd, setOldPwd] = useState('');
	const [validOldPwd, setValidOldPwd] = useState(false);
	const [pwdOldFocus, setOldPwdFocus] = useState(false);

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
   const showToastFiveSec = (type, description) =>{
   
      props.showToast(type, "top-right", true, 5000, !description ? "Error" : description);
    }
	useEffect(() => {
		userRef.current.focus();
      const loadDataUser = async (e) => {
         try{
            const response = await axios.get(
               UPDATEDATAUSER_URL,
               {
                 headers: { 'Content-Type': 'application/json' },
                 withCredentials: true,
               }
           );  
           setLogin(response?.data?.login);   
           setUser(response?.data?.userName);   
           setEmail(response?.data?.email);   
           setPhoneNumber(response?.data?.phoneNumber);   
          
           setLoading(false);   
           setPwd('');
           setMatchPwd('');           
         }catch(err){
           setLoading(false);
         }         
       }
       loadDataUser();
      
	}, []);

	useEffect(() => {
		setValidName(USER_REGEX.test(userName));
	}, [userName]);
	
	useEffect(() => {
		setValidLogin(LOGIN_REGEX.test(login));
	}, [login]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email.toLowerCase()));
	}, [email]);

	useEffect(() => {
		setValidPhoneNumber(PHONENUMBER_REGEX.test(phoneNumber.toLowerCase()));
	}, [phoneNumber]);	

   useEffect(() => {
      if(!oldpwd)		   setValidOldPwd(false);
      if(oldpwd)		   setValidOldPwd(true);
	}, [oldpwd]);

	useEffect(() => {
		setValidPwd(PWD_REGEX.test(pwd));
		setValidMatch(pwd === matchPwd);
	}, [pwd, matchPwd]);

	useEffect(() => {
		setErrMsg('');
	}, [userName, pwd, matchPwd, login, email, phoneNumber]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		//if button enabled with JS hack
		
		const v1 = USER_REGEX.test(userName);
		const v2 = PWD_REGEX.test(pwd);
		const v3 = EMAIL_REGEX.test(email);
		const v4 = PHONENUMBER_REGEX.test(phoneNumber);
		const v5 = LOGIN_REGEX.test(login);
		
		if (!v1 || !v3 || !v4 || !v5 ) {
			setErrMsg('Invalid Entry');
			return;
		}     
		try {
			const response = await axios.post(
				UPDATEDATAUSER_URL,
				JSON.stringify({ login, userName, email, phoneNumber, oldpwd, pwd, matchPwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			
			//clear state and controlled inputs
         setOldPwd('');
			setPwd('');
			setMatchPwd('');
         showToastFiveSec("success", "Данные сохранены.");
		} catch (err) {
			if (!err?.response) {
				showToastFiveSec("error",'Сервер не отвечает. Повторите попытку позже.');
			} else if (err.response?.status === 409) {
				showToastFiveSec("error",'Такой логин, почта или номер телефона уже используются.');
			} else if (err.response?.status === 408) {
				showToastFiveSec("error",'Пароль не верный!');
			}else if (err.response?.status === 410) {
				showToastFiveSec("error",'Новые пароли не совпадают или не заданы!');
			} else {
				showToastFiveSec("error",'Произошла ошибка во время изменения данных.');
			}
			errRef.current.focus();
		}
	};
   return ( 
      <>       
         <div className="container">
            <div id="wrapper">      
               <div className="centered-conteiner">
               <section >
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1 id='title-singreg'>Личные данные</h1>
					
					<div>
                  <div>
                     <label htmlFor="login">
                        Логин:
                        <FontAwesomeIcon
                           icon={faCheck}
                           className={validLogin ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                           icon={faTimes}
                           className={validLogin || !login ? 'hide' : 'invalid'}
                        />
                     </label>
                     <input
                        className='input-data'
                        type="text"
                        id="login"		
                        ref={userRef}				
                        autoComplete="off"
                        onChange={(e) => setLogin(e.target.value)}
                        value={login}
                        required
                        aria-invalid={validLogin ? 'false' : 'true'}
                        aria-describedby="uidnote"
                        onFocus={() => setLoginFocus(true)}
                        onBlur={() => setLoginFocus(false)}
                     />
                     <p
                        id="uidnote"
                        className={
                           loginFocus && login && !validLogin ? 'instructions' : 'offscreen'
                        }
                     >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Логин должен быть от 4 до 24 символов.
                        <br />
                        Должно начинаться с буквы.
                        <br />
                        Разрешены буквы, цифры, подчеркивания, дефисы.
                     </p>
                  </div>
					
                     <div>
                     <label htmlFor="username">
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
                        type="text"
                        id="username"
                        className='input-data'
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
                  <div>
                     <label htmlFor="Email">
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
                        type="text"
                        id="email"
                        className='input-data'
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
                  <div>
                     <label htmlFor="phoneNumber">
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
                        type="text"
                        id="phoneNumber"
                        className='input-data'
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
                  <div>
                     <label htmlFor="password">
                        Старый пароль:
                        <FontAwesomeIcon
                           icon={faCheck}
                           className={validOldPwd ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                           icon={faTimes}
                           className={validOldPwd || !oldpwd ? 'hide' : 'invalid'}
                        />
                     </label>
                     <input
                        type="password"
                        id="password"
                        className='input-data'
                        onChange={(e) => setOldPwd(e.target.value)}
                        value={oldpwd}
                        required
                        aria-invalid={validOldPwd ? 'false' : 'true'}
                        aria-describedby="pwdnote"
                        onFocus={() => setOldPwdFocus(true)}
                        onBlur={() => setOldPwdFocus(false)}
                     />
                     <p
                        id="pwdnote"
                        className={pwdOldFocus && !validOldPwd ? 'instructions' : 'offscreen'}
                     >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        от 8 до 24 символов.
                        <br />
                        Должно содержать заглавные и строчные буквы, цифру и
                        специальный символ.
                        <br />
                        Разрешенные специальные символы:{' '}
                        <span aria-label="exclamation mark">!</span>{' '}
                        <span aria-label="at symbol">@</span>{' '}
                        <span aria-label="hashtag">#</span>{' '}
                        <span aria-label="dollar sign">$</span>{' '}
                        <span aria-label="percent">%</span>
                     </p>
                  </div>
						<div>
                     <label htmlFor="password">
                        Новый пароль:
                        <FontAwesomeIcon
                           icon={faCheck}
                           className={validPwd ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                           icon={faTimes}
                           className={validPwd || !pwd ? 'hide' : 'invalid'}
                        />
                     </label>
                     <input
                        type="password"
                        id="password"
                        className='input-data'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                        aria-invalid={validPwd ? 'false' : 'true'}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                     />
                     <p
                        id="pwdnote"
                        className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
                     >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        от 8 до 24 символов.
                        <br />
                        Должно содержать заглавные и строчные буквы, цифру и
                        специальный символ.
                        <br />
                        Разрешенные специальные символы:{' '}
                        <span aria-label="exclamation mark">!</span>{' '}
                        <span aria-label="at symbol">@</span>{' '}
                        <span aria-label="hashtag">#</span>{' '}
                        <span aria-label="dollar sign">$</span>{' '}
                        <span aria-label="percent">%</span>
                     </p>
                  </div>
                     <div>
                     <label htmlFor="confirm_pwd">
                     Подтвердите новый пароль:
                        <FontAwesomeIcon
                           icon={faCheck}
                           className={validMatch && matchPwd ? 'valid' : 'hide'}
                        />
                        <FontAwesomeIcon
                           icon={faTimes}
                           className={validMatch || !matchPwd ? 'hide' : 'invalid'}
                        />
                     </label>
                     <input
                        type="password"
                        id="confirm_pwd"
                        className='input-data'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        value={matchPwd}
                        required
                        aria-describedby="confirmnote"
                        aria-invalid={validMatch ? 'false' : 'true'}
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                     />
                     <p
                        id="confirmnote"
                        className={
                           matchFocus && !validMatch ? 'instructions' : 'offscreen'
                        }
                     >
                        <FontAwesomeIcon icon={faInfoCircle} />
                        Пароли не совпадают.
                     </p>
                  </div>
						<Button id='button-sing' className='input-data'
							disabled={!validEmail|| !validLogin || !validPhoneNumber || !validName ? true : false}
                     onClick={handleSubmit} autoFocus>
                     	Сохранить
                    </Button>
					</div>
				</section>
               </div>
            </div>
         </div>
      </>
   );
}

export default ProfilePage;