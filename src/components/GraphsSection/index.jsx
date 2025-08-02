"use client";
import LineCharts from '../LineCharts';
import PieCharts from '../PieCharts';
import { Typography, Select, MenuItem, Button } from '@mui/material';
import { Download } from 'lucide-react';
import './style.css';
import * as XLSX from 'xlsx'

export default function GraphsSection({ expenses, incomes, handleMonth, month }) {

    const handleDownload = (e) => {
        e.preventDefault();
        const rowsExp = expenses.map((expense) => ({
            id: expense.id,
            nome: expense.nome,
            valor: expense.valor,
            cartao: expense.cartao,
            data: expense.data
        }));

        const rowsInc = incomes.map((income) => ({
            id: income.id,
            valor: income.valor,
            descricao: income.descricao,
            tipo: income.tipo,
            categoria: income.categoria,
            data: income.data
        }));

        const workbook = XLSX.utils.book_new();

        const worksheetExp = XLSX.utils.json_to_sheet(rowsExp);
        const worksheetInc = XLSX.utils.json_to_sheet(rowsInc);

        XLSX.utils.sheet_add_aoa(worksheetExp, [["ID", "Nome", "Valor", "Cartão", "Data"]], { origin: "A1" });
        XLSX.utils.sheet_add_aoa(worksheetInc, [["ID", "Valor", "Descrição", "Tipo", "Categoria", "Data"]], { origin: "A1" });
        
        const max_width_exp = rowsExp.reduce((w, r) => Math.max(w, r.name.length), 10);
        worksheetExp["!cols"] = [ { wch: max_width_exp } ];

        const max_width_inc = rowsInc.reduce((w, r) => Math.max(w, r.name.length), 10);
        worksheetInc["!cols"] = [ { wch: max_width_inc } ];

        XLSX.utils.book_append_sheet(workbook, worksheetExp, "Despesas");
        XLSX.utils.book_append_sheet(workbook, worksheetInc, "Receitas");

        XLSX.writeFile(workbook, "relatorio_" + month + ".xlsx", { compression: true });
    }

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
                <LineCharts expenses={expenses} incomes={incomes} />
                <PieCharts expenses={expenses} incomes={incomes} />
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

                <Button variant="outlined" startIcon={<Download />} onClick={handleDownload}>
                    Exportar
                </Button>
            </div>
        </div>
    );
}
