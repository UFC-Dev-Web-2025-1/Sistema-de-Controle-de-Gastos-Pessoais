import MyCards from "@/components/MyCards";
import NavBar from "@/components/NavBar";
import QuickAccess from "@/components/QuickAccess";
import styles from "../page.module.css";
import LineCharts from "@/components/LineCharts";
import { Box, Paper } from "@mui/material";
import MyExpenses from "@/components/MyExpenses";
import OverviewSection from "@/components/OverviewSection";

export default function Entrar(){
    return(
        <div className={styles.page}>
            <main className={styles.main}>
                <NavBar page='inicio'/>
                <OverviewSection />
                <Paper sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    width: '90vw',
                    height: '36.2vh',
                    alignItems: 'center',
                }}>
                <MyExpenses />
                <MyCards />
                <QuickAccess />
                </Paper>
                <Box component='span'
                sx={{
                    width: '90vw',
                    height: '24.4vh'
                }}>
                <LineCharts/>
                </Box>
            </main>
        </div>
    );
}