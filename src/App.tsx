import styles from './App.module.css';
import Navbar from './components/Navbar';
import Critters from './pages/Critters'
import Home from './pages/Home'
import Conservation from './pages/Conservation'
import Quiz from './pages/Quiz'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
		<BrowserRouter>
			<Navbar />

			<Routes>
				<Route path="/critters" element={<Critters />} />
				<Route path="/" element={<Home />} />
				<Route path="/conservation" element={<Conservation />} />
				<Route path="/quiz" element={<Quiz />} />
			</Routes>
		</BrowserRouter>
		</>
	);
}

export default App;

