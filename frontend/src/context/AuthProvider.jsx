import React, { useState, useMemo } from 'react';
import Context from './index.js';

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('user')));

  const memo = useMemo(() => ({ data: userData, setUserData }), [userData]);

  return (
    <Context.Provider value={memo}>
      {children}
    </Context.Provider>
  );
};

export default AuthProvider;
