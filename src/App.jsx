import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "layouts/admin"; 
import Login from "views/Login/Login";
import ProtectedRoute from "./ProtectedRoute";
import {io} from 'socket.io-client'

export const socket = io("https://steakhouse-backend.onrender.com",{
  auth :{
    token : localStorage.getItem('token')
  }
})

const App = () => {
  return (
    <Routes>
       <Route path="/" element={<Login/>}/>
      <Route path="admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
     
      {/*<Route path="/" element={<Navigate to="/admin" replace />} />*/}
    </Routes>
  );
};

export default App;