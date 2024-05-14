import { useState, useEffect } from 'react';
import axios from 'axios';
import GraficoPizza from './graficopizza';
import './styles.css';
import { useNavigate } from 'react-router-dom';

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [entradas, setEntradas] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [resDespesas, resEntradas] = await Promise.all([
                    axios.get('https://mdiniz-studio-production-3796.up.railway.app/api/despesas/', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('https://mdiniz-studio-production-3796.up.railway.app/api/entradas/', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                ]);

                if (resDespesas.data.success && resEntradas.data.success) {
                    const despesasData = resDespesas.data.data;
                    const entradasData = resEntradas.data.data;
                    setGastos(despesasData);
                    setEntradas(entradasData);
                    updateTotal(despesasData, entradasData);
                } else {
                    console.error('Erro ao buscar dados:', resDespesas.data.error, resEntradas.data.error);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const updateTotal = (despesas, entradas) => {
        const totalDespesas = despesas.reduce((acc, curr) => acc + curr.valor, 0);
        const totalEntradas = entradas.reduce((acc, curr) => acc + curr.valor, 0);
        setTotal(totalEntradas - totalDespesas);
    };

    const handleDelete = async (id, isDespesa = true) => {
        const token = localStorage.getItem('token');
        const url = isDespesa ? `https://mdiniz-studio-production-3796.up.railway.app/api/despesas/despesa/${id}` : `https://mdiniz-studio-production-3796.up.railway.app/api/entradas/${id}`;
        try {
            const response = await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                if (isDespesa) {
                    setGastos(prev => prev.filter(item => item._id !== id));
                } else {
                    setEntradas(prev => prev.filter(item => item._id !== id));
                }
                updateTotal(isDespesa ? gastos.filter(item => item._id !== id) : gastos, isDespesa ? entradas : entradas.filter(item => item._id !== id));
            } else {
                console.error('Erro ao excluir item:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao excluir item:', error);
        }
    };

    // Combina e ordena as entradas e gastos por data
    const combinedData = [...gastos, ...entradas].sort((a, b) => new Date(a.data) - new Date(b.data));

    return (
        <div>
            <h2 className='gastos-title'>Gastos e Entradas</h2>
            {loading && <div className="loader"></div>}
            {!loading && (
                <div>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Descrição</th>
                                    <th>Valor</th>
                                    <th>Data</th>
                                    <th>Categoria</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {combinedData.map(item => (
                                    <tr key={item._id} className={item.categoria !== ('Salário' || 'Aluguel') ? 'despesa-row' : ''}>
                                        <td>{item.descricao}</td>
                                        <td>{item.categoria === ('Salário' || 'Aluguel') ? `R$${item.valor.toFixed(2)}` : `-R$${item.valor.toFixed(2)}`}</td>
                                        <td>{new Date(item.data).toLocaleDateString()}</td>
                                        <td>{item.categoria}</td>
                                        
                                        <td>{item.categoria === ('Salário' || 'Aluguel') ? '' : <button onClick={() => handleDelete(item._id, item.categoria !== 'Salário')} className="delete-button">❌</button>}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <p className="text-right">Saldo Atual: R$ {total.toFixed(2)}</p>
                    </div>
                    <GraficoPizza data={combinedData} />
                </div>
            )}
        </div>
    );
};

export default Gastos;
