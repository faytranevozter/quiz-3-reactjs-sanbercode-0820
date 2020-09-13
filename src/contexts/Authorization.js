import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [isLogin, setIsLoginX] = useState(null);

  const setIsLogin = (val) => {
    localStorage.setItem('is_login', val);
    setIsLoginX(val);
  };

  useEffect(() => {
    if (isLogin === null) {
      let isLoginLS = localStorage.getItem('is_login');
      if (isLoginLS === null) {
        isLoginLS = false;
      }
      setIsLogin(isLoginLS === 'true');
    }
  }, [isLogin]);

  return (
    <AuthContext.Provider value={[isLogin, setIsLogin]}>
      {props.children}
    </AuthContext.Provider>
  );
};
