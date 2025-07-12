import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

export default function PieChart() {
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
        },
      ]}
      width={250}
      height={250}
      legendPosition="right"
      tooltip
      sx={{
        '& .MuiPieChart-legendLabel': {
          fontWeight: 'bold',
          fontSize: '1rem',
        },
      }}
    />
  );
}
