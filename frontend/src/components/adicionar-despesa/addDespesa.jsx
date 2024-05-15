// Importe useState do React
import axios from 'axios';
import { useEffect, useState } from 'react';
// Importe o SweetAlert para mensagens de sucesso ou erro
import Swal from 'sweetalert2';
import './style.css';
import { useNavigate } from 'react-router-dom';

// Componente do formulário de adicionar despesa
const AdicionarDespesaForm = () => {
  // Defina os estados para os campos do formulário
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [comprovante, setComprovante] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setComprovante(file);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
        if (!token) {
            
            return;
        }
  }, [navigate]);

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    const submitButton = document.getElementsByClassName('submit-button')[0];
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    event.preventDefault();
    const formData = new FormData();
    formData.append('descricao', descricao);
    formData.append('valor', valor);
    formData.append('data', data);
    formData.append('categoria', categoria);
    formData.append('comprovante', comprovante);

    try {
        const token = localStorage.getItem('token');
        const url = 'https://backend.controledegastos.app.br/api/despesas/adicionar';
        const response = await axios.post(url, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status === 201) {
            Swal.fire({
                icon: 'success',
                title: 'Despesa adicionada com sucesso!',
                showConfirmButton: false,
                timer: 1500
            });
            submitButton.disabled = false;
            submitButton.textContent = 'Adicionar Despesa';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo deu errado! Por favor, tente novamente mais tarde.'
            });
            submitButton.disabled = false;
            submitButton.textContent = 'Adicionar Despesa';
        }
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error.response ? error.response.data.error : error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo deu errado! Por favor, tente novamente mais tarde.'
        });
        submitButton.disabled = false;
        submitButton.textContent = 'Adicionar Despesa';
    }
};

  return (
    <div className="section mx-auto max-w-md px-4 py-8">
      <h2 className='page-title'>Adicionar Despesas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição:</label>
          <input type="text" id="descricao" name="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" required />
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
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700">Categoria:</label>
          <select id="categoria" name="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option value="">Selecione uma categoria</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Carta">Cartão</option>
            <option value="Contas">Contas</option>
            <option value="Crianças">Crianças</option>
            <option value="Gasolina">Gasolina</option>
            <option value="Lazer">Lazer</option>
            <option value="Moradia">Moradia</option>
            <option value="Studio">Studio</option>
            <option value="Outros">Outros</option>
            {/* Adicione outras opções de categoria conforme necessário */}
          </select>
        </div>
        <div>
          <input
            type="file"
            id="comprovante"
            name="comprovante"
            accept='image/*,application/pdf'
            onChange={handleFileChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <button type="submit" className="submit-button w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Adicionar Despesa</button>
      </form>
    </div>
  );
};

export default AdicionarDespesaForm;
