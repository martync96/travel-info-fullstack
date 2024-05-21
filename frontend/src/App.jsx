import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ChangePasswordPage from './pages/ChangePasswordPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NavBar from './components/NavBar.jsx';
import RegisterUserPage from './pages/RegisterUserPage.jsx';
import WeatherPage from './pages/WeatherPage.jsx';

function App() {

  const [signedIn, setSignedIn] = useState(false);
  const [favouriteLocations, setFavouriteLocations] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setSignedIn(true);
    }
  }, []); //on page load, check if a token is stored in localStorage, if so, set signedIn to true

  useEffect(() => {
    if (localStorage.getItem('favouriteLocations')) {
      setFavouriteLocations(JSON.parse(localStorage.getItem('favouriteLocations')));
    }
  }, []); //on page load, check if a token is stored in localStorage, if so, set signedIn to true

  return (
    <div>
      <NavBar signedIn={signedIn} setSignedIn={setSignedIn} favouriteLocations={favouriteLocations} setFavouriteLocations={setFavouriteLocations}/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/change-password" element={<ChangePasswordPage />} />
        <Route path="/register" element={<RegisterUserPage />} />
        <Route path="/weather/:location" element={<WeatherPage favouriteLocations={favouriteLocations} setFavouriteLocations={setFavouriteLocations}/>} />
      </Routes>
    </div>
  )
}

export default App;
