"use client";
import React from 'react';
import LineChart from '../LineChart';
import PieChart from '../PieChart';
import { Typography, Select, MenuItem, Button } from '@mui/material';
import { Download } from 'lucide-react';
import './style.css';

export default function GraphsSection() {

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
                <LineChart />
                <PieChart />
            </div>

            <div className="graficos-controls">
                <Select defaultValue="Janeiro" size="small" >
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
