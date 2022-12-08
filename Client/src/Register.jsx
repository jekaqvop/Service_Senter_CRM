import { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from './api/axios';
import { Navigate } from 'react-router-dom';
import './index.css';

const LOGIN_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const USER_REGEX = /^(([А-ЯЁA-Z][а-яёa-z']+[\\-\s]?){2,3})$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PHONENUMBER_REGEX = /^(?:\+375|80)\s?\(?\d\d\)?\s?\d\d(?:\d[\\-\s]\d\d[\\-\s]\d\d|[\\-\s]\d\d[\\-\s]\d\d\d|\d{5})$/;
const REGISTER_URL = '/api/Auth/register';

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

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

	const [matchPwd, setMatchPwd] = useState('');
	const [validMatch, setValidMatch] = useState(false);
	const [matchFocus, setMatchFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
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
		
		if (!v1 || !v2 || !v3 || !v4 || !v5 || !(pwd === matchPwd) ) {
			setErrMsg('Invalid Entry');
			return;
		}
		try {
			const response = await axios.post(
				REGISTER_URL,
				JSON.stringify({ login, userName, email, phoneNumber, pwd, matchPwd }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
			// TODO: remove console.logs before deployment
			console.log(JSON.stringify(response?.data));
			const message = response?.data.messageValue;
			const trueMessage = "New user " + login + " created!";
			if(message === trueMessage)
				setSuccess(true);
			
			//clear state and controlled inputs
			setUser('');
			setEmail('');
			setLogin('');
			setPhoneNumber('');
			setPwd('');
			setMatchPwd('');
		} catch (err) {
			if (!err?.response) {
				setErrMsg('Сервер не отвечает. Повторите попытку позже.');
			} else if (err.response?.status === 409) {
				setErrMsg('Такой логин, почта или номер телефона уже используются.');
			} else {
				setErrMsg('Произошла ошибка во время регистрации. Попробуйте позже.');
			}
			errRef.current.focus();
		}
	};

	return (
		<>
			{success ? (
				<Navigate to="/login" replace />
			) : (
				<div id='BackgroundBody'>
				<section >
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1 id='title-singreg'>Register</h1>
					
					<form onSubmit={handleSubmit}>
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
						
						
						<label htmlFor="password">
							Пароль:
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

						<label htmlFor="confirm_pwd">
						Подтвердите пароль:
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
							onChange={(e) => setMatchPwd(e.target.value)}
							value={matchPwd}
							required
							aria-invalid={validMatch ? 'false' : 'true'}
							aria-describedby="confirmnote"
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
							Must match the first password input field.
						</p>

						<button id='button-sing'
							disabled={!validEmail|| !validLogin || !validPhoneNumber || !validName || !validPwd || !validMatch ? true : false}
						>
							Sign Up
						</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className="line">
							<a href="/login">Sign In</a>
						</span>
					</p>
				</section>
				</div>
			)}
		</>
	);
};

export default Register;
