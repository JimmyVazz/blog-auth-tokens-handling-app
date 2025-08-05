import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Profile } from './components/Profile';

const App = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate('/profile');
    }
  }, [token, navigate]);

  return (
    <div>
      <h1>My App</h1>
      <Routes>
        <Route path="/login" element={<Login onToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
