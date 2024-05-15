// Importe useState do React
import axios from 'axios';
import { useState } from 'react';
// Importe o SweetAlert para mensagens de sucesso ou erro
import Swal from 'sweetalert2';
import './style.css';

// Componente do formulário de adicionar entrada
const AdicionarEntradaForm = () => {
  // Defina os estados para os campos do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const url = 'https://backend.controledegastos.app.br/api/entradas/adicionar'; // Use a URL correta
      const response = await axios.post(url, {
        descricao,
        valor,
        data,
        categoria
      }, {
        headers: {
          Authorization: `Bearer ${token}` // Substitua `token` pelo token JWT do usuário autenticado
        }
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: 'Entrada adicionada com sucesso!',
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo deu errado! Por favor, tente novamente mais tarde.'
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar entrada:', error.response.data.error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado! Por favor, tente novamente mais tarde.'
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <h2 className='page-title'>Adicionar Entradas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="origem" className="block text-sm font-medium text-gray-700">Origem:</label>
          <input type="text" id="origem" name="origem" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div>
          <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor:</label>
          <input type="number" id="valor" name="valor" value={valor} onChange={(e) => setValor(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div>
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data:</label>
          <input type="date" id="data" name="data" value={data} onChange={(e) => setData(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div>
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">categoria:</label>
          <select id="categoria" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Selecione um categoria</option>
            <option value="Salário">Salário</option>
            <option value="Freelance">Freelance</option>
            <option value="Investimento">Investimento</option>
            <option value="Presente">Presente</option>
            <option value="Outros">Outros</option>
            {/* Adicione outras opções de categoria conforme necessário */}
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Adicionar Entrada</button>
      </form>
    </div>
  );
};

export default AdicionarEntradaForm;
