import { useState, useEffect } from 'react';
import axios from 'axios';
import GraficoPizza from './graficopizza';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import Header from '../header/header';
import Loader from '../loader/loader';

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
    }, [navigate]);

    const updateTotal = (despesas, entradas) => {
        const totalDespesas = despesas.reduce((acc, curr) => acc + curr.valor, 0);
        const totalEntradas = entradas.reduce((acc, curr) => acc + curr.valor, 0);
        setTotal(totalEntradas - totalDespesas);
    };

    const handleDelete = async (id, isDespesa = true) => {
        const token = localStorage.getItem('token');
        const url = isDespesa ? `https://backend.controledegastos.app.br/api/despesas/despesa/${id}` : `https://backend.controledegastos.app.br/api/entradas/entrada/${id}`;
        console.log("Deleting URL:", url); // Verifica a URL
        try {
            const response = await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (response.data.success) {
                if (isDespesa) {
                    const updatedGastos = gastos.filter(item => item._id !== id);
                    setGastos(updatedGastos);
                    updateTotal(updatedGastos, entradas);
                } else {
                    const updatedEntradas = entradas.filter(item => item._id !== id);
                    setEntradas(updatedEntradas);
                    updateTotal(gastos, updatedEntradas);
                }
            } else {
                console.error('Erro ao excluir item:', response.data.error);
            }
        } catch (error) {
            console.error('Erro ao excluir item:', error);
        }
    };

    const combinedData = [...gastos, ...entradas].sort((a, b) => new Date(a.data) - new Date(b.data));

    const exportarPDF = async () => {
        const token = localStorage.getItem('token');
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                responseType: 'blob'
            };

            const response = await axios.get('https://backend.controledegastos.app.br/api/despesas/pdf', config);

            const fileURL = window.URL.createObjectURL(new Blob([response.data]));
            const fileLink = document.createElement('a');
            fileLink.href = fileURL;
            fileLink.setAttribute('download', 'Relatorio_Despesas.pdf');
            document.body.appendChild(fileLink);

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
                {loading && <Loader />}  {/* Use o componente Loader aqui */}
                {!loading && (
                    <>
                        {gastos.length === 0 && entradas.length === 0 ? (
                            <div className="no-data">
                                <p>Não há despesas ou entradas registradas.</p>
                                <div>
                                    <button onClick={() => navigate('/adicionar-despesa')} className="add-button">Adicionar Despesa</button>
                                    <button onClick={() => navigate('/adicionar-entrada')} className="add-button">Adicionar Entrada</button>
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
                                                    <td>{['Salário', 'Freelance', 'Investimento', 'Presente'].includes(item.categoria) ? '+R$' : '-R$'}{item.valor.toFixed(2)}</td>
                                                    <td>{item.categoria === 'Carta' ? "Cartão" : item.categoria}</td>
                                                    <td className='buttons-despesa'>
                                                        {item.categoria !== 'Salário' && (
                                                            <button onClick={() => handleDelete(item._id, true)} className="delete-button">X</button>
                                                        )}
                                                        {['Salário', 'Freelance', 'Investimento', 'Presente'].includes(item.categoria) && (
                                                            <button onClick={() => handleDelete(item._id, false)} className="delete-button">X</button>
                                                        )}
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
