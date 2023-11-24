import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartPageComponent from './pages/StartPageComponent';
import CreateCustomerPageComponent from './pages/CreateCustomerPageComponent';

function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPageComponent/>} />
      <Route path="/skapakund" element={<CreateCustomerPageComponent/>}/>
  </Routes>
  );
}

export default App;
