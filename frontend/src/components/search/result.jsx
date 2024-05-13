import React, { useState } from 'react';
import axios from 'axios';

const BuscaPorNome = () => {
  const [nome, setNome] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Faça a solicitação GET para buscar despesas por nome
      const response = await axios.get(`https://mdiniz-studio-production-3796.up.railway.app/api/despesas/buscar?nome=${nome}`);

      // Atualize os resultados da busca
      setResultados(response.data.data);
    } catch (error) {
      console.error('Erro ao buscar despesas por nome:', error);
      // Trate o erro aqui
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome da despesa"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {resultados.length > 0 && (
        <div>
          <h2>Resultados da Busca</h2>
          <ul>
            {resultados.map((resultado) => (
              <li key={resultado._id}>{resultado.nome}</li>
            ))}
          </ul>
        </div>
      )}
      {resultados.length === 0 && !loading && (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default BuscaPorNome;
