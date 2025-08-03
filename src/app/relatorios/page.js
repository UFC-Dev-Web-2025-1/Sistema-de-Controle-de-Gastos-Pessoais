"use client";
import { useState, useEffect } from 'react';
import NavBar from "../../components/NavBar";
import GraphsSection from "../../components/GraphsSection";
import { useApi } from "@/hooks/useApi";
import { expensesService } from "@/services/expensesService";
import { balanceService } from "@/services/balanceService";
import styles from "../page.module.css";
import { Box, CircularProgress, Typography } from "@mui/material";
export default function Relatorios() {
    const { data: expensesData, loading: loadingExp, error: errorExp } = useApi(expensesService.getAllExpenses);
    const { data: incomesData, loading: loadingInc, error: errorInc } = useApi(balanceService.getAllBalances);

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [month, setMonth] = useState('janeiro');

    useEffect(() => {
        if (expensesData) setExpenses(expensesData);
    }, [expensesData]);

    useEffect(() => {
        if (incomesData) setIncomes(incomesData);
    }, [incomesData]);

    // Mostrar loading enquanto busca os dados
    if (loadingExp || loadingInc) {
        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <NavBar page='relatorio' />
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="60vh"
                    >
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Carregando relatorio...
                        </Typography>
                    </Box>
                </main>
            </div>
        );
    }

    // Mostrar erro se houver
    if (errorExp || errorInc) {
        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <NavBar page='relatorio' />
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                        height="60vh"
                    >
                        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                            Erro ao carregar relatorio
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Verifique se o servidor Strapi está rodando
                        </Typography>
                    </Box>
                </main>
            </div>
        );
    }

    const handleMonth = (e) => {
        e.preventDefault();
        setExpenses(expenses.filter((expense) => e.targe.value == new Date(expense.data).toLocaleString('pt-BR', { month: 'long' })));
        setIncomes(incomes.filter((income) => e.targe.value == new Date(income.data).toLocaleString('pt-BR', { month: 'long' })));
        setMonth(e.target.value);
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar page='relatorio' />
                <GraphsSection
                    expenses={expenses}
                    incomes={incomes}
                    handleMonth={handleMonth}
                    month={month}
                />
            </main>
        </div>
    );
}
