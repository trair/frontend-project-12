import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes, Outlet,
} from 'react-router-dom';
import Checker from './pages/chat/components/Checker';
import Login from './pages/login/Login';
import NotFoundPage from './pages/NotFoundPage';
import Signup from './pages/signup/Signup';

import { useAuthContext } from './context/index.js';
import AuthProvider from './context/AuthProvider';

const PrivateRoute = () => {
  const authContext = useAuthContext();
  return authContext.data ? <Outlet /> : <Navigate to="/login" />;
};

const AuthRoute = () => {
  const authContext = useAuthContext();
  return authContext.data ? <Navigate to="/" /> : <Outlet />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<PrivateRoute><Checker /></PrivateRoute>)} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
