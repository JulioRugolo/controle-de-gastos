import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChartComponent = ({ data }) => {
  // Definindo uma lista de cores para as categorias
  const COLORS = [
    '#1f77b4', // Azul
    '#ff7f0e', // Laranja
    '#2ca02c', // Verde
    '#d62728', // Vermelho
    '#9467bd', // Roxo
    '#8c564b', // Marrom
    '#e377c2', // Rosa
    '#7f7f7f', // Cinza
    '#bcbd22', // Verde Claro
  ];
  

  // Agrupando os dados por categoria e somando os valores correspondentes
  const groupedData = data.reduce((acc, curr) => {
    let value;
    if (typeof curr.valor === 'string') {
      value = parseFloat(curr.valor.replace(',', '.')); // Convertendo o valor para número
    } else {
      value = parseFloat(curr.valor); // Convertendo o valor diretamente para número
    }
    if (isNaN(value)) {
      value = 0; // Se o valor não puder ser convertido para número, definimos como 0
    }
    if (acc[curr.categoria]) {
      acc[curr.categoria] += value;
    } else {
      acc[curr.categoria] = value;
    }
    return acc;
  }, {});

  // Convertendo os dados agrupados em um array de objetos
  const dataWithColors = Object.entries(groupedData).map(([categoria, valor], index) => ({
    categoria,
    valor,
    name: categoria, // Adicionando o nome da categoria como propriedade 'name'
    color: index < COLORS.length ? COLORS[index] : COLORS[index % COLORS.length], // Usando o index diretamente para obter as cores
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="valor"
        isAnimationActive={false}
        data={dataWithColors} // Usando os dados agrupados com cores associadas
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={({ percent }) => `${(percent * 100).toFixed(2)}%`} // Formatando os rótulos com a porcentagem
        labelLine={false} // Desativando as linhas de ligação dos rótulos
      >
        {/* Renderizando cada setor do gráfico com uma cor específica */}
        {dataWithColors.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {/* Personalizando a dica de ferramentas */}
      <Tooltip formatter={(value) => [`R$${value.toFixed(2).replace('.', ',')}`, `${dataWithColors.find((entry) => entry.valor === value)?.categoria}`]} />
      {/* Passando as categorias para o componente Legend */}
      <Legend />
    </PieChart>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      categoria: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PieChartComponent;
