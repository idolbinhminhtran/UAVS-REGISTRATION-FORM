import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import HomePage from './components/HomePage';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';

function App() {
  return (
    <Router basename="/UAVS-REGISTRATION-FORM">
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 