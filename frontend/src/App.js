import React, { useState, useMemo } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import NotFoundPage from '../pages/notFoundPage';
import Signup from '../pages/Signup';

import Context, { useAuthContext } from '../context/index.js';

const PrivateRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? children : <Navigate to="/login" />;
};

const AuthRoute = ({ children }) => {
  const authContext = useAuthContext();
  return authContext.data ? <Navigate to="/" /> : children;
};

const MainProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

  const memo = useMemo(() => ({ data: userData, setUserData }), [userData]);

  return (
    <Context.Provider value={memo}>
      {children}
    </Context.Provider>
  );
};

const App = () => (
  <MainProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={(<PrivateRoute><Chat /></PrivateRoute>)} />
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </MainProvider>
);

export default App;
