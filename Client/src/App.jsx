import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Panel from './Pages/Panel';
import 'boxicons/css/boxicons.min.css';
import PrivateRoute from './context/PrivateRoute';
import ErrorPage from './Pages/ErrorPage';
import AppLayout from './components/layout/AppLayout';
import UsersTable from './Pages/UsersTable';

import { useState } from 'react';

import './Pages/CSS/TestHoast.css';
import Toast from './components/Toasts/Toast';

import { TOAST_PROPERTIES } from './components/Toasts/toastProperties';
import Services from './Pages/Services';
import ServicePage from './Pages/ServicePage';

function App() {
	const [list, setList] = useState([]);
	const [position, setPosition] = useState("top-right");
	const [autoDelete, setAutoDelete] = useState(false);
	const [autoCloseTime, setAutoCloseTime] = useState(0);

	const showToast = (type, positionToast, autoDeleteToast, autoCloseTime, DescriptionToast) => {
	  setPosition(positionToast);
	  setAutoDelete(autoDeleteToast);
	  setAutoCloseTime(autoCloseTime);
	  
	  const toastProperties = TOAST_PROPERTIES.find((toast) => toast.title.toLowerCase() === type.toLowerCase());
	  toastProperties.description = DescriptionToast;
	  setList([...list, toastProperties]);
	}
	
   
	return (
		<main className="App">
			<Router>
				<Routes>
					
					<Route path="/register" exact element={<Register showToast={showToast}/>} />					
					<Route path="/login" element={<Login />} />			
					<Route path="/" element={
						<PrivateRoute>
							<AppLayout/>
						</PrivateRoute>
						}
					>
						<Route index element={<Services showToast={showToast}/>} />		
						<Route path='/user' element={<UsersTable showToast={showToast}/>} />
						<Route path='/order' element={<Panel />} />
					</Route>	
					<Route path="/seviceItemPage/:id" element={<ServicePage showToast={showToast}/>} />
					<Route path="*" element={<ErrorPage />} />	
				</Routes>
			</Router>
			<Toast 
				toastList={list}
				position={position}
				autoDelete={autoDelete}
				autoDeleteTime={parseInt(autoCloseTime, 10)}
				
			/>
		</main>
	);
}

export default App;
