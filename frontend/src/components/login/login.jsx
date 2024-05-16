import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importar o arquivo CSS
import Swal from 'sweetalert2';
import Header from '../header/header';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://backend.controledegastos.app.br/api/users/login', {
        email: email.toUpperCase(),
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log(response.data);
        localStorage.setItem('user', response.data.name);
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
      <Header user={''} />
      <div className='section'>
        <h1 className='page-title'>Login</h1>
        <div className="form-container">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Login</button>
          </form>
          <p className='no-account'>Não tem uma conta? <a href='/register'>Registre-se</a></p>
        </div>
      </div>
    </>
  );
}

export default LoginForm;
