import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginSignup from './pages/Login-Signup';
import StudentPage from './pages/StudentPage';
import './styles/App.css';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/student/*" element={<StudentPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
