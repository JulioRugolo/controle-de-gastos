// Importe useState do React
import axios from 'axios';
import { useState } from 'react';
// Importe o SweetAlert para mensagens de sucesso ou erro
import Swal from 'sweetalert2';
import './style.css';

// Componente do formulário de adicionar despesa
const AdicionarDespesaForm = () => {
  // Defina os estados para os campos do formulário
  const [lugar, setLugar] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); 

    try {
      const token = localStorage.getItem('token');
      const url = 'http://localhost:3000/api/despesas/adicionar'; // Use a URL correta
      const response = await axios.post(url, {
        lugar,
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
          title: 'Despesa adicionada com sucesso!',
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
      console.error('Erro ao adicionar despesa:', error.response.data.error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo deu errado! Por favor, tente novamente mais tarde.'
      });
    }
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <h2 className="text-2xl font-bold mb-4">Adicionar Despesa</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="lugar" className="block text-sm font-medium text-gray-700">Lugar:</label>
          <input type="text" id="lugar" name="lugar" value={lugar} onChange={(e) => setLugar(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="valor" className="block text-sm font-medium text-gray-700">Valor:</label>
          <input type="number" id="valor" name="valor" value={valor} onChange={(e) => setValor(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="data" className="block text-sm font-medium text-gray-700">Data:</label>
          <input type="date" id="data" name="data" value={data} onChange={(e) => setData(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
        </div>
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria:</label>
          <select id="categoria" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Selecione uma categoria</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Moradia">Moradia</option>
            {/* Adicione outras opções de categoria conforme necessário */}
          </select>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Adicionar Despesa</button>
      </form>
    </div>
  );
};

export default AdicionarDespesaForm;
