// Importe useState e useEffect do React
import { useState, useEffect } from 'react';
// Importe os ícones do menu
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

// Componente do cabeçalho
const Header = () => {
  // State para gerenciar a visibilidade da barra de navegação
  const [isMobile, setIsMobile] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Função para lidar com a alternância da barra de navegação
  const handleNavToggle = () => {
    setNavOpen(!navOpen);
  };

  // Efeito para verificar o tamanho da tela e definir isMobile
  useEffect(() => {
    // Função para lidar com o redimensionamento da tela
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Adiciona o event listener para o redimensionamento da tela
    window.addEventListener('resize', handleResize);

    // Executa handleResize inicialmente
    handleResize();

    // Remove o event listener quando o componente é desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Renderiza os itens da barra de navegação
  const renderNavItems = () => (
    <>
      <a href='/'>Home</a>
      <a href='/gastos'>Gastos</a>
      <a href='/adicionar-despesa'>Adicionar despesa</a>
      <a href='/buscar'>Buscar Despesa</a>
      <a href='/login'>Login</a>
      <a href='/register'>Registrar</a>
    </>
  );

  // Renderiza o componente de cabeçalho
  return (
    <div className='nav-container'>
      {/* Ícone de navegação móvel */}
      {isMobile && (
        <div className='mobile-toggle'>
          <button onClick={handleNavToggle}>
            <div style={{ color: 'white' }}>
              {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
            </div>
          </button>
        </div>
      )}
  
      {/* Navegação para desktop */}
      {!isMobile && renderNavItems()}
  
      {/* Menu de navegação móvel */}
      {isMobile && navOpen && (
        <ul className='mobile-nav'>
          {/* Itens de navegação móvel */}
          {renderNavItems()}
        </ul>
      )}
    </div>
  );
};

export default Header;
