"use client";
import LineCharts from '../LineCharts';
import PieCharts from '../PieCharts';
import { Typography, Select, MenuItem, Button } from '@mui/material';
import { Download } from 'lucide-react';
import './style.css';

export default function GraphsSection({expenses, incomes, handleMonth}) {

    

    return (
        <div className="graficos-section">
            <Typography
                sx={{
                    fontFamily: 'Roboto, sans-serif',
                    fontWeight: 500,
                    fontSize: '1.56rem',
                    color: 'black',
                    marginBottom: '1.9rem'
                }}
            >
                Gráficos
            </Typography>

            <div className="graficos-content">
                <LineCharts expenses={expenses} incomes={incomes}/>
                <PieCharts expenses={expenses} incomes={incomes}/>
            </div>

            <div className="graficos-controls">
                <Select defaultValue="Janeiro" size="small" onChange={handleMonth} >
                    {[
                        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
                    ].map((mes) => (
                        <MenuItem key={mes} value={mes}>
                            {mes}
                        </MenuItem>
                    ))}
                </Select>

                <Button variant="outlined" startIcon={<Download />}>
                    Exportar
                </Button>
            </div>
        </div>
    );
}
