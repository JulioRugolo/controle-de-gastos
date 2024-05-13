import { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import './header.css';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Adicione o estado para controlar se o usuário está logado

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Verifica se há um token armazenado no localStorage
    const token = localStorage.getItem('token');
    setLoggedIn(!!token); // Define loggedIn como verdadeiro se houver um token

    // Função para verificar se o usuário está logado
    const checkLoggedIn = () => {
      const token = localStorage.getItem('token');
      setLoggedIn(!!token);
    };

    // Adiciona um event listener para verificar se o usuário está logado ao fazer login/logout
    window.addEventListener('storage', checkLoggedIn);

    return () => window.removeEventListener('storage', checkLoggedIn);
  }, []);

  const handleNavToggle = () => {
    setNavOpen(!navOpen);
    const title = document.getElementsByClassName('titlepage')[0];
    title.style.display = title.style.display === 'none' ? 'block' : 'none';
  };

  const handleLogout = () => {
    // Remove o token do localStorage
    localStorage.removeItem('token');
    // Atualiza o estado loggedIn para false
    setLoggedIn(false);
  };

  const renderNavItems = () => (
    <>
      <a href='/'>Home</a>
      <a href='/gastos'>Gastos</a>
      <a href='/adicionar-despesa'>Adicionar despesa</a>
      <a href='/buscar'>Buscar Despesa</a>
      {!loggedIn ? <a href='/login'>Login</a> : <a href='#' onClick={handleLogout}>Logout</a>}
      {!loggedIn && <a href='/register'>Registrar</a>}
    </>
  );

  return (
    <div className='nav-container'>
      {isMobile && (
        <div className='mobile-toggle toggle-mobile-box'>
          <button onClick={handleNavToggle}>
            <div style={{ color: 'white' }}>
              {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
          </button>
        </div>
      )}

      {!isMobile && renderNavItems()}

      {isMobile && navOpen && (
        <ul className='mobile-nav'>
          {renderNavItems()}
        </ul>
      )}
    </div>
  );
};

export default Header;
