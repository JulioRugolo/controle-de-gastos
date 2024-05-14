// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header';
import './App.css';
import LoginForm from './components/login/login';
import RegisterForm from './components/login/register';
import AdicionarDespesaForm from './components/adicionar-despesa/addDespesa';
import Gastos from './components/gastos/gastos';
import Search from './components/search/search';
import AdicionarEntradaForm from './components/adicionar-entrada/addEntrada';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto text-center p-4 flex justify-center items-center h-full">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/gastos" element={<Gastos />} />
          <Route path="/buscar" element={<Search />} />
          <Route path="/adicionar-despesa" element={<AdicionarDespesaForm />} />
          <Route path="/adicionar-entrada" element={<AdicionarEntradaForm />} />
          <Route path="/" element={
            <div className="text-center">
              <h1>Bem-vindo ao seu aplicativo de controle de gastos!</h1>
              <p>Aqui você pode gerenciar suas despesas de forma simples e eficiente.</p>
              <p>Para começar, faça login na sua conta ou registre-se se ainda não tem uma.</p>
              <p>Lembre-se de que você pode adicionar despesas na aba `Adicionar Despesa` e visualizar todas elas na aba `Gastos`.</p>
              <p>Para qualquer dúvida, entre em contato conosco pelo e-mail julio@rugolo.dev.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
