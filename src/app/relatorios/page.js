"use client";
import {useState} from 'react';
import NavBar from "../../components/NavBar";
import GraphsSection from "../../components/GraphsSection";
import { useApi } from "@/hooks/useApi";
import { expensesService, balanceService } from "@/services/";
import styles from "../page.module.css";

export default function Relatorios() {
    const { data: expensesData, loading: loadingExp, error: errorExp } = useApi(expensesService.getAllExpenses);
    const { data: incomesData, loading: loadingInc, error: errorInc } = useApi(balanceService.getAllBalances);


    // Mostrar loading enquanto busca os dados
    if (loadingExp || loadingInc) {
        return (
            <div className={styles.page}>
                <main className={styles.main}>
                    <NavBar page='relatorio'/>
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
                    <NavBar page='relatorio'/>
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

    
    const [expenses, setExpenses] = useState(expensesData);
    const [incomes, setIncomes] = useState(incomesData);
    const [month, setMonth] = useState('janeiro');

    const handleMonth = (e) => {
        e.preventDefault();
        setExpenses(expenses.filter((expense) => e.targe.value == new Date(expense.data).toLocaleString('pt-BR', {month: 'long'})));
        setIncomes(incomes.filter((income) => e.targe.value == new Date(income.data).toLocaleString('pt-BR', {month: 'long'})));
        setMonth(e.target.value);
    }

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar page='relatorio'/>
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
