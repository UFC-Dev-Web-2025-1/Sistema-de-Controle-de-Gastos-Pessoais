import Item from "../components/Item";
import styles from "./page.module.css";


export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
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
            </main>
        </div>
    );
}
