import { useState, useEffect } from 'react';
import axios from 'axios';
import GraficoPizza from './graficopizza';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [entradas, setEntradas] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && total === 0 || !token) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const [resDespesas, resEntradas] = await Promise.all([
                    axios.get('https://backend.controledegastos.app.br/api/despesas/', {
                        headers: { Authorization: `Bearer ${token}` }
                    }),
                    axios.get('https://backend.controledegastos.app.br/api/entradas/', {
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
    }, [navigate, total]);

    const updateTotal = (despesas, entradas) => {
        const totalDespesas = despesas.reduce((acc, curr) => acc + curr.valor, 0);
        const totalEntradas = entradas.reduce((acc, curr) => acc + curr.valor, 0);
        setTotal(totalEntradas - totalDespesas);
    };

    const handleDelete = async (id, isDespesa = true) => {
        const token = localStorage.getItem('token');
        const url = isDespesa ? `https://backend.controledegastos.app.br/api/despesas/despesa/${id}` : `https://backend.controledegastos.app.br/api/entradas/${id}`;
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

    const exportarPDF = async () => {
        const token = localStorage.getItem('token');
        try {
            // Configuração para passar o token no header
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob'  // Resposta esperada como um Blob para download direto
            };

            // Faça a requisição e receba o Blob como resposta
            const response = await axios.get('https://backend.controledegastos.app.br/api/despesas/pdf', config);

            // Cria um URL para o blob
            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'Relatorio_Despesas.pdf');
            document.body.appendChild(fileLink);

            // Trigger download
            fileLink.click();
            fileLink.parentNode.removeChild(fileLink);
        } catch (error) {
            console.error('Erro ao exportar PDF:', error);
        }
    };

    return (
        <>
            <Header user={localStorage.getItem('user')} />
            <div className='section'>
                <h2 className='page-title gastos-title'>Gastos e Entradas</h2>
                {loading && <div className="loader"></div>}
                {!loading && (
                    <>
                        {gastos.length === 0 && entradas.length === 0 ? (
                            <div className="no-data">
                                <p>Não há despesas ou entradas registradas.</p>
                                <div>
                                    <button onClick={() => navigate('/add-despesa')} className="add-button">Adicionar Despesa</button>
                                    <button onClick={() => navigate('/add-entrada')} className="add-button">Adicionar Entrada</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="overflow-x-auto">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Data</th>
                                                <th>Descrição</th>
                                                <th>Valor</th>
                                                <th>Categoria</th>
                                                <th>Ação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {combinedData.map(item => (
                                                <tr key={item._id}>
                                                    <td>{new Date(item.data).toLocaleDateString()}</td>
                                                    <td>{item.descricao}</td>
                                                    <td>{item.categoria !== 'Salário' ? '-R$' : '+R$' }{item.valor.toFixed(2)}</td>
                                                    <td>{item.categoria}</td>
                                                    <td className='buttons-despesa'>
                                                        <button onClick={() => handleDelete(item._id)} className="delete-button">{item.categoria !== 'Salário' ? '❌' : '' }</button>
                                                        {item.comprovante && (
                                                            <button onClick={() => window.open(`https://backend.controledegastos.app.br/api/despesas/comprovante/${item._id}`, '_blank')} className="view-button delete-button">👁️</button>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <p className="text-right">Saldo Atual: R$ {total.toFixed(2)}</p>
                                    <button onClick={exportarPDF} className="export-button">Exportar PDF</button>
                                </div>
                                <GraficoPizza data={combinedData} />
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default Gastos;
