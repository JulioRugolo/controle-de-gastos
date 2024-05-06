// src/components/Header.jsx
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <nav>
        <Link to="/servicos" className="px-4 hover:underline">Serviços</Link>
        <Link to="/contato" className="px-4 hover:underline">Contato</Link>
        <Link to="/agendar" className="px-4 hover:underline">Agendar</Link>
        <Link to="/login" className="px-4 hover:underline">Login</Link>
      </nav>
    </header>
  );
}

export default Header;
