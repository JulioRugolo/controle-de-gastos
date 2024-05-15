// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './components/login/login';
import RegisterForm from './components/login/register';
import AdicionarDespesaForm from './components/adicionar-despesa/addDespesa';
import Gastos from './components/gastos/gastos';
import Search from './components/search/search';
import Home from './components/home/home';
import AdicionarEntradaForm from './components/adicionar-entrada/addEntrada';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/adicionar-despesa" element={<AdicionarDespesaForm />} />
          <Route path="/adicionar-entrada" element={<AdicionarEntradaForm />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
