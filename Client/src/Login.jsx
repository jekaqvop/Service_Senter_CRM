import { useRef, useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from './api/axios';
import './index.css';
import { AuthContext } from './context/AuthContext';
const LOGIN_URL = "/api/Auth/login";

const Login = (history) => {
	const userRef = useRef();
	const errRef = useRef();

	const [Login, setLogin] = useState('');
	const [Password, setPassword] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

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
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	  
	};

	return (
		<>
			{success ? (
			<Navigate to="/"/>
			) : (
				<div id='BackgroundBody'>
				<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1 id='title-singreg'> Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setLogin(e.target.value)}
							value={Login}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPassword(e.target.value)}
							value={Password}
							required
						/>
						<button id='button-sing'>Sign In</button>
					</form>
					<p>
						Need an Account?
						<br />
						<span className="line" >
							<a href="/register">Sign Up</a>
						</span>
					</p>
				</section>
				</div>
			)}
		</>
	);
};

export default Login;
