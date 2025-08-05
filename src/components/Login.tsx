import { useState } from 'react';

export const Login = ({ onToken }: { onToken: (token: string) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log('Login response:', data);

    if (data?.accessToken) {
      onToken(data.accessToken);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
      <button disabled={email === '' || password === ''} onClick={handleLogin}>Login</button>
    </div>
  );
};
