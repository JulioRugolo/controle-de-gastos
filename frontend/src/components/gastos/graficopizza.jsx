import PropTypes from 'prop-types';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const PieChartComponent = ({ data }) => {
  // Definindo uma lista de cores para as categorias
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  // Mapeando os dados e associando cada categoria a uma cor específica
  const dataWithColors = data.map((entry, index) => ({
    ...entry,
    name: entry.categoria, // Adicionando o nome da categoria como propriedade 'name'
    color: COLORS[index % COLORS.length], // Usando módulo para garantir que as cores se repitam se houver mais categorias do que cores definidas
  }));

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="valor"
        isAnimationActive={false}
        data={dataWithColors} // Usando os dados com cores associadas
        cx="50%"
        cy="50%"
        outerRadius={80}
        fill="#8884d8"
        label
      >
        {/* Renderizando cada setor do gráfico com uma cor específica */}
        {dataWithColors.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {/* Personalizando a dica de ferramentas */}
      <Tooltip formatter={(value) => [`R$${value}`, dataWithColors.find(entry => entry.valor === value)?.categoria]} />
      {/* Passando as categorias para o componente Legend */}
      <Legend />
    </PieChart>
  );
};

PieChartComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      valor: PropTypes.number.isRequired,
      categoria: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default PieChartComponent;
