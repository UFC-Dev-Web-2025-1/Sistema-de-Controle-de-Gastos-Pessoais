import MyCards from "@/components/MyCards";
import NavBar from "../components/NavBar";
import QuickAccess from "../components/QuickAccess";
import GraphsSection from "../components/GraphsSection";
import styles from "./page.module.css";
import { Container, LineChart } from "lucide-react";
import { Paper } from "@mui/material";
import MyExpenses from "@/components/MyExpenses";


export default function Home() {

    const expensesDaily = [{
        id: 1,
        name: 'Comida',
        value: '200,00',
    },
    {
        id: 2,
        name: 'Viagem',
        value: '1800,00'
    },
    {
        id: 3,
        name: 'Livros',
        value: '77,86'
    },
    {
        id: 4,
        name: 'Contas',
        value: '550,00'
    }
];





    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                <Paper sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '90vw',
                    height: '36.2vh'

                }}>
                <MyExpenses />
                <MyCards />
                <QuickAccess />
                </Paper>
                <LineChart/>
            </main>
        </div>
    );
}
