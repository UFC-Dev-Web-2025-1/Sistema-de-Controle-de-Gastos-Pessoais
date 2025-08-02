'use client';
import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieCharts({expenses, incomes}) {

  const categoryData = expenses.reduce((acc, { categoria, valor }) => {
    acc[categoria] = (acc[categoria] || 0) + valor;
    return acc;
  }, {});

  categoryData['receitas'] = incomes.reduce((sum, { valor }) => sum + valor, 0);

  const total = Object.values(categoryData).reduce((sum, val) => sum + val, 0);

  const chartData = Object.entries(categoryData).map(([categoria, valor]) => ({
    label: categoria,
    value: Math.round((valor / total) * 100),
    labelMarkType: 'line',
  }));

  chartData.push({
    label: 'Receitas',
    value: categoryData['receitas'],
    labelMarkType: 'circle',
  });

  return (
    <PieChart
      series={[
        {
          data: chartData,
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
