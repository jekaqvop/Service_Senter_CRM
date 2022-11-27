import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Panel from './Pages/Panel';
import 'boxicons/css/boxicons.min.css';

import PrivateRoute from './context/PrivateRoute';
import ErrorPage from './Pages/ErrorPage';
import AppLayout from './components/layout/AppLayout';
import UsersTable from './components/UsersTable/UsersTable';


function App() {
	return (
		<main className="App">
			<Router>
				<Routes>
					
					<Route path="/register" exact element={<Register />} />
					
					<Route path="/login" element={<Login />} />			
					<Route path="/" element={
						<PrivateRoute>
							<AppLayout/>
						</PrivateRoute>
						}
					>
						<Route index element={<Panel />} />
						<Route path='/started' element={<Panel />} />
						<Route path='/calendar' element={<Panel />} />
						<Route path='/user' element={<UsersTable />} />
						<Route path='/order' element={<Panel />} />
					</Route>
					<Route path="*" element={<ErrorPage />} />	
				</Routes>
			</Router>
		</main>
	);
}

export default App;
