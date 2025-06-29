import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>
                    Altere o arquivo <code>src/app/page.js</code>.
                </p>
            </main>
        </div>
    );
}
