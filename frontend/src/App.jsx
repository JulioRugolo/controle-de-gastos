// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import './App.css';
import LoginForm from './components/login/login';
import RegisterForm from './components/login/register';
import AdicionarDespesaForm from './components/adicionar-despesa/addDespesa';
import Gastos from './components/gastos/gastos';
import Search from './components/search/search';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto text-center p-4">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/adicionar-despesa" element={<AdicionarDespesaForm />} />
          <Route path="/" element={
            <h1>Teste</h1>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
