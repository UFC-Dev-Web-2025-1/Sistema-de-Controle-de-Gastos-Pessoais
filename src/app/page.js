"use client";

import MyCards from "@/components/MyCards";
import Item from "../components/Item";
import NavBar from "../components/NavBar";
import QuickAccess from "../components/QuickAccess";
import GraphsSection from "../components/GraphsSection";
import styles from "./page.module.css";
import MyExpenses from "@/components/MyExpenses";
import ExpensesBoard from "@/components/ExpensesBoard";

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
    },
    {
        id: 5,
        name: 'Transporte',
        value: '120,00'
    },
    {
        id: 10,
        name: 'Lazer',
        value: '300,00'
    },
    {
        id: 6,
        name: 'Lazer',
        value: '300,00'
    }
    ,
    {
        id: 8,
        name: 'Lazer',
        value: '300,00'
    }
    ,
    {
        id: 7,
        name: 'Lazer',
        value: '300,00'
    }
];





    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                <ExpensesBoard height ='30vw' width='74vw' items={expensesDaily}/>
                
            </main>
        </div>
    );
}
