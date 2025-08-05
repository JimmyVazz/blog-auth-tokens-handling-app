import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const res = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 201) {
      navigate('/login');
    } else {
      const data = await res.json();
      console.error('Error al registrar:', data.message || 'Algo salió mal');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
      />
      <button disabled={email === '' || password === ''} onClick={handleRegister}>Register</button>
    </div>
  );
};
