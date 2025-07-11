import Item from "../components/Item";
import ItemList from "../components/ItemList";
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

const cards = [
  { id: 1, name: "Visa Gold", value: 1500.00, type: "crédito" },
  { id: 2, name: "Master Black", value: 2450.60, type: "débito" },
  { id: 3, name: "Elo Mais", value: 980.45, type: "crédito" },
  { id: 4, name: "Nubank", value: 3200.00, type: "débito" },
  { id: 5, name: "Inter", value: 890.75, type: "crédito" },
  { id: 6, name: "Santander Free", value: 610.00, type: "débito" },
  { id: 7, name: "Inter", value: 890.75, type: "crédito" },
  { id: 8, name: "Inter", value: 890.75, type: "crédito" },
  { id: 9, name: "Inter", value: 890.75, type: "crédito" }
];


    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                <div style={{display: 'flex', gap: 10, justifyContent: 'flex-start'}}>
                
                <ItemList
                    contents={cards}
                    type={'cards'}
                    width={'35.7vw'}
                />
                </div>
                
            </main>
        </div>
    );
}
