import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importar o arquivo CSS
import Swal from 'sweetalert2';
import Header from '../header/header';

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "As senhas não coincidem!",
      });
      return;
    }

    try {
      const response = await axios.post('https://backend.controledegastos.app.br/api/users/register', {
        name,
        email: email.toUpperCase(),
        password
      });
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Registrado com sucesso!",
          text: "Você será redirecionado para a página de login.",
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao registrar, tente novamente!",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao registrar, tente novamente!",
      });
    }
  };

  return (
    <>
    <Header user={''} />
      <div className='section'>
        <h1 className='page-title'>Registro</h1>
        <div className="form-container">
          <form onSubmit={handleRegister}>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Nome"
              required
            />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              required
            />
            <div className="password-container">
              <input
                type={"password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Senha"
                required
              />
            </div>
            <div className="password-container">
              <input
                type={"password"}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirme a Senha"
                required
              />
            </div>
            <button type="submit">Registrar</button>
          </form>
          <p className='no-account'>Já tem uma conta? <a href='/login'>Login</a></p>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
