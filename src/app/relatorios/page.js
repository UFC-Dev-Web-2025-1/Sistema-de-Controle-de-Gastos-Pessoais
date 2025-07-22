"use client";

import NavBar from "../../components/NavBar";
import GraphsSection from "../../components/GraphsSection";
import styles from "../page.module.css";

export default function Relatorios() {
    const expensesData = [
        { category: 'Comida', amount: 200 },
        { category: 'Viagem', amount: 1800 },
        { category: 'Livros', amount: 77.86 },
        { category: 'Contas', amount: 550 },
        { category: 'Transporte', amount: 120 },
        { category: 'Lazer', amount: 300 }
    ];

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar page='relatorio'/>
                <GraphsSection data={expensesData} />
            </main>
        </div>
    );
}
