import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        username,
        password
      });
      if (response.data.token) {
        console.log('Login bem-sucedido! Token:', response.data.token);
        // Armazenar o token no localStorage ou em cookies
        localStorage.setItem('token', response.data.token);
        // Redirecionar para a página de dashboard
        navigate('/dashboard');
      } else {
        // Tratar erro de login
        console.error('Login falhou!');
      }
    } catch (error) {
      console.error('Erro de login:', error.response.data);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
