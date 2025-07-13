'use client';
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieCharts() {
  return (
    <PieChart
      series={[
        {
          data: [
            { value: 45, label: 'Receitas', labelMarkType: 'circle' },
            { value: 25, label: 'Despesas Fixas', labelMarkType: 'line' },
            { value: 15, label: 'Despesas Variáveis', labelMarkType: 'line' },
            { value: 15, label: 'Investimentos', labelMarkType: 'square' },
          ],
          arcLabel: (item) => `${item.value}%`,
        },
      ]}

      width={250}
      height={250}
      sx={{
        '& .MuiChartsLegend-label': {
          fontSize: '1rem',
          fontWeight: 'medium',
        },
      }}
    />
  );
}
