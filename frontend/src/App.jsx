import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HomePage from './pages/HomePage.jsx';
import NavBar from './components/NavBar.jsx';

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
      </Routes>
    </div>
  )
}

export default App
