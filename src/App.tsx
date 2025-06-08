// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import MainPage from './pages/MainPage';
import MyPage  from './pages/MyPage';
import  SpendPage  from './pages/SpendPage';
import  CategoryPage  from './pages/CategoryPage';
import DiscountPage  from './pages/DiscountPage';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/user" element={<MyPage />} />
        <Route path="/spend" element={<SpendPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/discount" element={<DiscountPage />} />
      </Routes>
    </Router>
  );

  
};

export default App;