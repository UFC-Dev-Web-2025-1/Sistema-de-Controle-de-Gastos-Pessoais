import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { DollarSign, BanknoteArrowUp, BanknoteArrowDown } from 'lucide-react';
import './style.css';

export default function FinancialCard({ title, value, iconName, iconSize = 24 }) {
  const icons = {
    BanknoteArrowUp: <BanknoteArrowUp size={iconSize} />,
    BanknoteArrowDown: <BanknoteArrowDown size={iconSize} />,
    DollarSign: <DollarSign size={iconSize} />
  };

  return (
    <Card className="financial-card">
      <CardContent>
        <div>{icons[iconName]}</div>
        <Typography variant="h6">{value}</Typography>
        <Typography variant="subtitle2">{title}</Typography>
      </CardContent>
    </Card>
  );
}