import { Grab } from "lucide-react";
import Item from "../components/Item";
import NavBar from "../components/NavBar";
import QuickAccess from "../components/QuickAccess";
import GraphsSection from "../components/GraphsSection";
import styles from "./page.module.css";
import Settings from "../components/Settings";
export default function Home() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar />
                <Settings 
                name = "Cauã"
                email = "cauanqx2015@gmail.com"
                />
            </main>
        </div>
    );
}
