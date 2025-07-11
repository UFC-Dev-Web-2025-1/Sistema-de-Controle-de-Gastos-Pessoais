import Item from "../components/Item";
import NavBar from "../components/NavBar";
import QuickAccess from "../components/QuickAccess";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                <Item
                    name="Inter"
                    value="200,00"
                    type="crédito"
                />
                <Item
                    itemType="expenses-monthly"
                    name="Comida"
                    value="70,00"
                />
                <Item
                    itemType="expenses-daily"
                    name="Uber"
                    value="12,78"
                />
                <QuickAcess /> {/* teste para visualizar o componente */}
            </main>
        </div>
    );
}
