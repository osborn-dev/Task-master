import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store'
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DarkModeSwitch } from 'react-toggle-dark-mode';
// import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <Provider store={store}>
      <Router>
        <div className="containe">
          <div className={darkMode ? 'dark-mode' : ''}>
            <div className="theme-toggle">
              <DarkModeSwitch color="grey" onClick={toggleDarkMode}>
                {darkMode ? 'Light Mode' : 'Dark Mode'}
              </DarkModeSwitch>
            </div>
            <Header />
            <Routes>
              <Route path="/mainpage" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
