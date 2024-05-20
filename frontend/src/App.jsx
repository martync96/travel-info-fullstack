import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NavBar from './components/NavBar.jsx';
import RegisterUserPage from './pages/RegisterUserPage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';

function App() {

  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSignedIn(true);
    }
  }, []); //on page load, check if a token is stored in localStorage, if so, set signedIn to true

  return (
    <div>
      <NavBar signedIn={signedIn} setSignedIn={setSignedIn}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/weather/:location" element={<WeatherPage />} />
      </Routes>
    </div>
  )
}

export default App
