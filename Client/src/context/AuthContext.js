import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({});

const useLocalStorageList = (key,defaultValue) => {
  const [ state, setState ] = useState(()=>JSON.parse(localStorage.getItem(key)||defaultValue))
  useEffect(()=>{
      localStorage.setItem(key, JSON.stringify(state))
  },[key, state])
  return [ state, setState ]
}

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ loading: true, data: null });
  const [state, setState] = useLocalStorageList('authData', null);
  
  const setAuthData = (data) => {
    setAuth({data: data});
  };

  useEffect(() => {
    setAuth({ loading: false, data: state});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setState(auth.data);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.data]);
  
// 1. when **auth.data** changes we are setting **auth.data** in localStorage with the key 'authData'.

  return (
    <AuthContext.Provider value={{ auth, setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
