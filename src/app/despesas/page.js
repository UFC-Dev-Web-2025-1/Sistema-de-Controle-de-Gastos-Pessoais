"use client";

import NavBar from "../../components/NavBar";
import ExpensesBoard from "@/components/ExpensesBoard";
import { useApi } from "@/hooks/useApi";
import { expensesService } from "@/services/expensesService";
import { CircularProgress, Box, Typography } from "@mui/material";
import styles from "../page.module.css";

export default function Despesas() {
    // Buscar despesas da API usando o hook
    const { data: expensesData, loading, error, refetch } = useApi(expensesService.getAllExpenses);

    // Debug logs
    console.log('=== DEBUG DESPESAS ===');
    console.log('expensesData:', expensesData);
    console.log('loading:', loading);
    console.log('error:', error);
    console.log('=====================');

    // Transformar os dados da API para o formato esperado pelo componente
    const formatExpenses = (apiData) => {
        if (!apiData || !Array.isArray(apiData)) {
            return [];
        }
        
        const formatted = apiData.map(item => {
            const formattedItem = {
                id: item.id,
                name: item.attributes?.nome || item.nome || 'Sem nome',
                value: item.attributes?.valor || item.valor || '0,00',
            };
            return formattedItem;
        });
        return formatted;
    };

    const formattedExpenses = formatExpenses(expensesData);

    // Mostrar loading enquanto busca os dados
    if (loading) {
        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <NavBar page='despesas'/>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center" 
                        alignItems="center" 
                        height="60vh"
                    >
                        <CircularProgress size={60} />
                        <Typography variant="h6" sx={{ mt: 2 }}>
                            Carregando despesas...
                        </Typography>
                    </Box>
                </main>
            </div>
        );
    }

    // Mostrar erro se houver
    if (error) {
        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <NavBar page='despesas'/>
                    <Box 
                        display="flex" 
                        flexDirection="column" 
                        justifyContent="center" 
                        alignItems="center" 
                        height="60vh"
                    >
                        <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                            Erro ao carregar despesas
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Verifique se o servidor Strapi está rodando
                        </Typography>
                    </Box>
                </main>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar page='despesas'/>
                <ExpensesBoard 
                    width='80vw' 
                    height='60vh' 
                    items={formattedExpenses}
                    onRefresh={refetch}
                />
            </main>
        </div>
    );
}
