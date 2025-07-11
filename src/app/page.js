import MyCards from "@/components/MyCards";
import NavBar from "../components/NavBar";
import styles from "./page.module.css";


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


const expensesMonthly = [
  { id: 1, name: "Supermercado", value: 320.75 },
  { id: 2, name: "Internet", value: 89.90 },
  { id: 3, name: "Água", value: 45.60 },
  { id: 4, name: "Energia elétrica", value: 150.00 },
  { id: 5, name: "Streaming", value: 34.90 },
  { id: 6, name: "Gasolina", value: 280.00 },
  { id: 7, name: "Farmácia", value: 65.00 },
  { id: 8, name: "Almoço fora", value: 120.00 }
];



    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                
                <MyCards />
                
            </main>
        </div>
    );
}
