import React from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Checker from './pages/chat/components/Checker';
import Login from './pages/login/Login';
import NotFoundPage from './pages/NotFoundPage';
import Signup from './pages/signup/Signup';

import { useAuthContext } from './context/index.js';
import AuthProvider from './context/AuthProvider';
import routes from './routes.js';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? children : <Navigate to={routes.loginPagePath()} />;
};

const AuthRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? <Navigate to={routes.rootPagePath()} /> : children;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path={routes.rootPagePath()} element={(<PrivateRoute><Checker /></PrivateRoute>)} />
        <Route path={routes.loginPagePath()} element={<AuthRoute><Login /></AuthRoute>} />
        <Route path={routes.singUpPagePath()} element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
