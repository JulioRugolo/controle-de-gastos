// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import './App.css';
import LoginForm from './components/login';
import RegisterForm from './components/register';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto text-center p-4">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/" element={
            <h1>Teste</h1>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
