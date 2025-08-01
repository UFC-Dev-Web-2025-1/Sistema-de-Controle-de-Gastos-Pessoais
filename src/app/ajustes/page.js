"use client";

import TestStrapi from "../../components/TestStrapi";
import NavBar from "../../components/NavBar";
import Settings from "../../components/Settings";
import styles from "../page.module.css";

export default function Ajustes() {
    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar page='ajustes'/>
                <TestStrapi />
                <Settings />
            </main>
        </div>
    );
}
