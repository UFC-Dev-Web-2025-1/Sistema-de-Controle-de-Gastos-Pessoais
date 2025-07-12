import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };

const receitaData = [5000, 4500, 4800, 5200, 6000, 5800, 6100];
const despesasData = [3000, 2800, 3500, 3300, 4000, 3900, 4200];

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];

export default function LineCharts() {
  return (
    <LineChart
      height={300}
      series={[
        { data: receitaData, label: 'Receita', color: '#1976d2' },
        { data: despesasData, label: 'Despesas', color: '#d32f2f' },
      ]}
      xAxis={[{ scaleType: 'point', data: meses }]}
      yAxis={[{ width: 50 }]}
      margin={margin}
      sx={{
        '& .MuiChartsLegend-label': {
          fontSize: '1rem',
          fontWeight: 'medium',
        },
      }}
    />
  );
}
