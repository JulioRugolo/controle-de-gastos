import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importar o arquivo CSS
import Swal from 'sweetalert2'

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://mdiniz-studio-production-3796.up.railway.app/api/users/login', {
        username: username.toUpperCase(),
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        // Redirecionar para a página de dashboard
        navigate('/gastos');
      } else {
        // Tratar erro de login
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Dados incorretos, tente novamente!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Dados incorretos, tente novamente!",
      });
    }
  };

  return (
    <>
    <h1 className='title'>Login</h1>
      <form className="form-container" onSubmit={handleLogin}>
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
    </>
  );
}

export default LoginForm;
