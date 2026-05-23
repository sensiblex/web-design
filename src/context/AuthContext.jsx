import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const getUsers = () => {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Неправильный логин или пароль');
    }

    const userData = { email, name: foundUser.name };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = (email, password) => {
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
      throw new Error('Email Уже есть');
    }

    const newUser = {
      id: Date.now(),
      email,
      password,
      name: email.split('@')[0],
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    const initialWallet = {
      balance: 10000,
      assets: [],
      transactions: []
    };
    localStorage.setItem('wallet', JSON.stringify(initialWallet));

    const userData = { email, name: newUser.name };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('ERROR');
  }
  return context;
};
