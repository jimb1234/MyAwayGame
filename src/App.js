import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ViewUpcomingMatches from './pages/Upcoming';
import Dashboard from './pages/dashboard'; 
import Navbar from './components/navbar';  
import AwayDayPage from './pages/awaydays';
import 'mapbox-gl/dist/mapbox-gl.css';  // Import Mapbox GL CSS


function App() {
  return (
    <Router>
      <div>
        <Navbar />  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upcoming-matches" element={<ViewUpcomingMatches />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/away-day/:teamName" element={<AwayDayPage />} />  
        </Routes>
      </div>
    </Router>
  );
}

export default App;
