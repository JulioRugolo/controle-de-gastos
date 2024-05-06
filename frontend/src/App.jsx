// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import './App.css';
import LoginForm from './components/login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Header />
      <div className="container mx-auto text-center p-4">
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/dashboard" element={<h1>Dashboard</h1>} />
          <Route path="/" element={
            <div>
              <button onClick={() => setCount(count => count + 1)}>
                count is {count}
              </button>
              <p>Edit <code>src/App.jsx</code> and save to test HMR</p>
            </div>
          } />
        </Routes>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </Router>
  );
}

export default App;
