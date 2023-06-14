import { useRef, useState, useEffect } from 'react';
import {
	faCheck,
	faTimes,
	faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom';
import axios from './api/axios';
import './index.css';
import { AuthContext } from './context/AuthContext';
import Preloader from './components/Preloader/Preloader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LOGIN_URL = "/api/Auth/PasswordRecovery";
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


const PasswordRecovery = (history) => {
	const errRef = useRef();	

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

    const [message, setMessage] = useState(null);
	const [email, setEmail] = useState('');
	const [validEmail, setValidEmail] = useState(false);
	const [emailFocus, setEmailFocus] = useState(false);

    useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email.toLowerCase()));
	}, [email]);

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {			
			const response = await axios.post(
				LOGIN_URL + "/" + email,
				
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);
            
            setMessage(response?.data);
			
		} catch (err) {
			
			if (!err?.response) {
				setErrMsg('Сервер не отвечает. Повторите попытку позже.');
			} else if (err.response?.status === 400) {
				setErrMsg('Ошибка сервера');
			} else if (err.response?.status === 401) {
				setErrMsg('Сервер вас разлогинил');
			} else {
				setErrMsg('Неверный логин');
			}
			errRef.current.focus();
		}
	  
	};

	return (
		<>
			{message ? (
			<div id='BackgroundBody'>
            <section>               
                <h1 id='title-singreg'>Восстановление пароля</h1>              
                <label htmlFor="Email">
                        {message}   
                    <p style={{float: 'right'}}>	
                    <br/>
                    <br/>      
                    <br/>                   
                        <span className="line" style={{float: 'right'}}>
							<Link to="/login">Войти</Link>					
						</span>	                       
                        <br/>
						<span className="line" style={{float: 'right'}}>
							<Link to="/">На главную страницу</Link>					
						</span>
					</p>                
                </label>                    
            </section>
            </div>	
			) : (<div id='BackgroundBody'>
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1 id='title-singreg'>Вход</h1>
					<form onSubmit={handleSubmit}>
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
							autocomplete="off"
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
						<button id='button-sing'>Восстановить</button>
					</form>
					<p>
						Нет аккаунта?
						<br />
						<span className="line" >
							<Link to="/register">Зарегистрироваться</Link>							
						</span>
						<span className="line" >
							<Link to="/">На главную страницу</Link>					
						</span>
					</p>
				</section>
				</div>			
			)}
		</>
	);
};

export default PasswordRecovery;
