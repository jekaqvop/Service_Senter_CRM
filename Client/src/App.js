import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Panel from './screens/Panel';

import PrivateRoute from './context/PrivateRoute';
import ErrorPage from './screens/ErrorPage';


function App() {
	return (
		<main className="App">
			<Router>
				<Routes>
					<Route path="/register" exact element={<Register />} />
					
					<Route path="/login" element={<Login />} />			
					<Route path="/" element={
						<PrivateRoute>
							<Panel />
						</PrivateRoute>
						}
					/>
					<Route path="*" element={<ErrorPage />} />	
				</Routes>
			</Router>
		</main>
	);
}

export default App;
