import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GraficoPizza from './graficopizza';
import './styles.css'; // Importa o arquivo CSS de estilos

const Gastos = () => {
    const [gastos, setGastos] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchGastos = async () => {
            try {
                const response = await axios.get('https://mdiniz-studio-production-3796.up.railway.app/api/despesas/');
                if (response.data.success) {
                    const data = response.data.data;
                    setGastos(data);
                    const totalGastos = data.reduce((acc, curr) => acc + curr.valor, 0);
                    setTotal(totalGastos);
                } else {
                    console.error('Erro ao buscar gastos:', response.data.error);
                }
            } catch (error) {
                console.error('Erro ao buscar gastos:', error);
            }
        };

        fetchGastos();
    }, []);

    return (
        <div>
            <h2>Gastos</h2>
            <div className="overflow-x-auto">
                {/* Tabela de gastos */}
                <table className="table">
                    <thead>
                        <tr>
                            <th>Lugar</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Categoria</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gastos.map(gasto => (
                            <tr key={gasto._id}>
                                <td data-label="Lugar">{gasto.lugar}</td>
                                <td data-label="Valor">R$ {gasto.valor.toFixed(2)}</td>
                                <td data-label="Data">{new Date(gasto.data).toLocaleDateString()}</td>
                                <td data-label="Categoria">{gasto.categoria}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <p className="text-right">Total Gasto: R$ {total.toFixed(2)}</p>
            </div>
            
            {/* Gráfico de pizza */}
            <GraficoPizza data={gastos} />
        </div>
    );
};

export default Gastos;
