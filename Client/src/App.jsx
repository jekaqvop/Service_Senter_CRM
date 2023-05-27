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
import StaffersTable from './Pages/StaffersTable';
import DevicesTable from './Pages/DevicesTable';
import OrdersTable from './Pages/OrdersTable';
import MainPage from './Pages/MainPage';
import ServicesPublicPage from './Pages/ServicesPublicPage';
import ProfilePage from './Pages/ProfilePage';
import MyOrders from './Pages/MyOrders';
import Messanger from './Pages/Messanger';
import AdminPanel from './Pages/AdminPanel';


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
					
					<Route path="/" exact element={<MainPage showToast={showToast}/>} />					
					
					<Route path="/services" exact element={<ServicesPublicPage showToast={showToast}/>} />					
					<Route path="/register" exact element={<Register showToast={showToast}/>} />					
					<Route path="/login" element={<Login />} />		
							
					<Route path="/account/" element={
						<PrivateRoute>
							<AppLayout/>
						</PrivateRoute>
						}
					>						
						<Route path="/account/profile" exact element={<ProfilePage showToast={showToast}/>} />	
						<Route path="/account/myOrders" exact element={<MyOrders showToast={showToast}/>} />			
						<Route path="/account/adminpanel" exact element={<AdminPanel showToast={showToast}/>} />
						<Route path='/account/services' element={<Services showToast={showToast}/>} />		
						<Route path='/account/orders' element={<OrdersTable showToast={showToast}/>} />		
						<Route path='/account/users' element={<UsersTable showToast={showToast}/>} />
						<Route path='/account/devices' element={<DevicesTable showToast={showToast}/>} />
						<Route path='/account/staffers' element={<StaffersTable showToast={showToast}/>} />
					
						<Route path="/account/messages" element={<Messanger showToast={showToast}/>} />
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
