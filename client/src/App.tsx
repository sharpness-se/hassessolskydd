import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import StartPageComponent from './pages/StartPage';
import CreateCustomerPageComponent from './pages/CreateCustomerPage';
import CreateOrderPageComponent from './pages/CreateOrderPage';
import SearchOrderPage from './pages/SearchOrderPage';
import EditCustomerPage from './pages/EditCustomerPage';


function App() {
  return (
    <Routes>
      <Route path="/" element={<StartPageComponent />} />
      <Route path="/skapakund" element={<CreateCustomerPageComponent />} />
      <Route path="/skapaorder" element={<CreateOrderPageComponent />} />
      <Route path="/seordrar" element={<SearchOrderPage />} />
      <Route path="/customer/:id" element={<EditCustomerPage/>}/>
    </Routes>
  );
}

export default App;
