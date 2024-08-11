import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';

const RoutesComponent = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/" element={<Login />} />
  </Routes>
);

export default RoutesComponent;
