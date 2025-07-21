"use client";

import NavBar from "../../components/NavBar";
import ExpensesBoard from "@/components/ExpensesBoard";
import styles from "../page.module.css";

export default function Despesas() {
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
    },
    {
        id: 5,
        name: 'Transporte',
        value: '120,00'
    },
    {
        id: 6,
        name: 'Lazer',
        value: '300,00'
    }];

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                <ExpensesBoard height='40vw' items={expensesDaily} />
            </main>
        </div>
    );
}
