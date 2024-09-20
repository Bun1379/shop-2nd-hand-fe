import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './view/LoginRegister/Login';
import Register from './view/LoginRegister/Register';
import ForgotPW from './view/LoginRegister/ForgotPW';
import Verify from './view/LoginRegister/Verify';
import Home from './view/User/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-pw" element={<ForgotPW />} />
        <Route path="/verify" element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
