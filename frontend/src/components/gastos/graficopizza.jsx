import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChartComponent = ({ data }) => {
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

  // Categorias a serem excluídas do gráfico de pizza
  const excludedCategories = ["Salário", "Freelance", "Investimento", "Presente"];

  // Agrupando os dados por categoria e somando os valores correspondentes
  const groupedData = data.reduce((acc, curr) => {
    // Se a categoria for uma das excluídas, pular esta entrada
    if (excludedCategories.includes(curr.categoria)) return acc;

    let value;
    if (typeof curr.valor === 'string') {
      value = parseFloat(curr.valor.replace(',', '.'));
    } else {
      value = parseFloat(curr.valor);
    }
    if (isNaN(value)) value = 0;

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
    name: categoria,
    color: index < COLORS.length ? COLORS[index] : COLORS[index % COLORS.length],
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="valor"
        isAnimationActive={false}
        data={dataWithColors}
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
        labelLine={false}
      >
        {dataWithColors.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip formatter={(value) => [`R$${value.toFixed(2).replace('.', ',')}`, `${dataWithColors.find((entry) => entry.valor === value)?.categoria}`]} />
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
