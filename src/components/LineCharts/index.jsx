import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

const margin = { right: 24 };


const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago'];

export default function LineCharts({incomes, expenses}) {
  return (
    <LineChart
      height={300}
      series={[
        { data: incomes, label: 'Receita', color: '#1976d2' },
        { data: expenses, label: 'Despesas', color: '#d32f2f' },
      ]}
      xAxis={[{ scaleType: 'point', data: meses }]}
      yAxis={[{ width: 50 }]}
      margin={margin}
      sx={{
        mt: 0,
        '& .MuiChartsLegend-label': {
          fontSize: '1rem',
          fontWeight: 'medium',
        },
      }}
    />
  );
}
