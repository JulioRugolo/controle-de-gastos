import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css'; // Importe o arquivo CSS para aplicar os estilos

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://backend.controledegastos.app.br/api/users/register', {
        username: username.toUpperCase(),
        password
      });

      if (response.status === 201) {
        // Tratar sucesso de registro
        console.log('Registro bem-sucedido!');
        // Redirecionar para a página de login após o registro bem-sucedido
        navigate('/login');
      }
    } catch (error) {
      console.error('Erro de registro:', error.response.data);
    }
  };

  return (
    <>
        <h1 className='title'>Registre-se</h1>
        <div className="form-container"> {/* Adicione o className 'form-container' */}
        <form onSubmit={handleRegister}>
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
            <button type="submit">Registrar</button>
        </form>
        <p className='no-account'>Já tem uma conta? <a href='/login'>Login</a></p>
        </div>
    </>
  );
}

export default RegisterForm;
