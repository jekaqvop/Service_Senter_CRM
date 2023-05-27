import { useRef, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from './api/axios';
import './index.css';
import { AuthContext } from './context/AuthContext';
import Preloader from './components/Preloader/Preloader';

const LOGIN_URL = "/api/Auth/login";

const Login = (history) => {
	const userRef = useRef();
	const errRef = useRef();

	const [Login, setLogin] = useState('');
	const [Password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const { setAuthData } = useContext(AuthContext);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [Login, Password]);

	const handleSubmit = async (e) => {
		e.preventDefault();		
		try {
			setIsLoading(true);
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ Login, Password }),
				{
					headers: { 'Content-Type': 'application/json' },
					withCredentials: true,
				}
			);

			setAuthData({ data:  response?.data?.success });
			setSuccess(response?.data?.success);
			setLogin('');
			setPassword('');
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			if (!err?.response) {
				setErrMsg('Сервер не отвечает. Повторите попытку позже.');
			} else if (err.response?.status === 400) {
				setErrMsg('Неверный логин или пароль');
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
			{success ? (
			<Navigate to="/account/services"/>
			) : (
				isLoading ? <Preloader/> : (
				<div id='BackgroundBody'>
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
						<label htmlFor="login">Логин:</label>
						<input
							type="text"
							id="login"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setLogin(e.target.value)}
							value={Login}
							required
						/>

						<label htmlFor="password">Пароль:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={Password}
							required
						/>
						<button id='button-sing'>Войти</button>
					</form>
					<p>
						Нет аккаунта?
						<br />
						<span className="line" >
							<a href="/register">Зарегистрироваться</a>							
						</span>
						<span className="line" >
							<a href="/">На главную страницу</a>					
						</span>
					</p>
				</section>
				</div>
			)
			)}
		</>
	);
};

export default Login;
