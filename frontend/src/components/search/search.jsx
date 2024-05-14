import { useState } from 'react';
import axios from 'axios';
import './style.css'

const formatarValor = (valor) => {
  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
  return formatter.format(valor);
};

const formatarData = (data) => {
  return new Date(data).toLocaleDateString('pt-BR');
};

const BuscaPorNome = () => {
  const [lugar, setLugar] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      // Faça a solicitação GET para buscar despesas por nome
      const response = await axios.get(`https://mdiniz-studio-production-3796.up.railway.app/api/despesas/buscar/${lugar}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Adiciona o token ao cabeçalho da requisição
                    }
                });

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
    <div className='search-container'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={lugar}
          onChange={(e) => setLugar(e.target.value)}
          placeholder="Digite o nome da despesa"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {resultados.length > 0 && (
        <div className='result'>
          <h2>Resultados da Busca</h2>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Local</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Categoria</th>
                </tr>
              </thead>
              <tbody>
                {resultados.map((resultado) => (
                  <tr key={resultado._id}>
                    <td>{resultado.descricao}</td>
                    <td>{formatarValor(resultado.valor)}</td>
                    <td>{formatarData(resultado.data)}</td>
                    <td>{resultado.categoria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {resultados.length === 0 && !loading && (
        <p>Nenhum resultado encontrado.</p>
      )}
    </div>
  );
};

export default BuscaPorNome;
