'use client';
import { useState, useEffect, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import MyExpenses from "@/components/MyExpenses";
import MyCards from "@/components/MyCards";
import QuickAccess from "@/components/QuickAccess";
import LineCharts from "@/components/LineCharts";
import OverviewSection from "@/components/OverviewSection";
import NavBar from "@/components/NavBar";
import styles from "@/app/page.module.css";

export default function Dashboard() {

  const receitasPadrao = [
    { id: 1, name: "Salário", value: 5000 },
    { id: 2, name: "Freelancer", value: 1500 },
  ];

  const despesasPadrao = [
    { id: 1, name: "Compras", value: 320.75 },
    { id: 2, name: "Conta", value: 89.90 },
    { id: 3, name: "Conta", value: 45.60 },
    { id: 4, name: "Conta", value: 150.00 },
    { id: 5, name: "Streaming", value: 34.90 },
    { id: 6, name: "Viagem", value: 280.00 },
    { id: 7, name: "Farmácia", value: 65.00 },
    { id: 8, name: "Comida", value: 120.00 }
  ];

  const cartaoPadrao = [
    { id: 1, name: "Visa Gold", value: 1500.00, type: "crédito" },
    { id: 2, name: "Master Black", value: 2450.60, type: "débito" },
    { id: 3, name: "Elo Mais", value: 980.45, type: "crédito" },
    { id: 4, name: "Nubank", value: 3200.00, type: "débito" },
    { id: 5, name: "Inter", value: 890.75, type: "crédito" },
  ];


  const [receitas, setReceitas] = useState(receitasPadrao);
  const [despesas, setDespesas] = useState(despesasPadrao);
  const [cartoes, setCartoes] = useState(cartaoPadrao);


  useEffect(() => {
    const saved = localStorage.getItem("receitas");
    if (saved) setReceitas(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("despesas");
    if (saved) setDespesas(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("cartoes");
    if (saved) setCartoes(JSON.parse(saved));
  }, []);


  useEffect(() => {
    localStorage.setItem("receitas", JSON.stringify(receitas));
  }, [receitas]);

  useEffect(() => {
    localStorage.setItem("despesas", JSON.stringify(despesas));
  }, [despesas]);

  useEffect(() => {
    localStorage.setItem("cartoes", JSON.stringify(cartoes));
  }, [cartoes]);


  const handleAddReceita = (novaReceita) => {
    setReceitas((prev) => [...prev, { ...novaReceita, id: prev.length + 1 }]);
  };

  const handleAddDespesa = (novaDespesa) => {
    setDespesas((prev) => [...prev, { ...novaDespesa, id: prev.length + 1 }]);
  };

  const handleAddCartao = (novoCartao) => {
    setCartoes((prev) => [...prev, { ...novoCartao, id: prev.length + 1 }]);
  };


  const totalReceitas = useMemo(() => receitas.reduce((acc, r) => acc + (r.value || 0), 0), [receitas]);
  const totalDespesas = useMemo(() => despesas.reduce((acc, d) => acc + (d.value || 0), 0), [despesas]);
  const totalSaldo = totalReceitas - totalDespesas;


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <NavBar page="inicio" />

        <OverviewSection 
          totalReceitas={totalReceitas} 
          totalDespesas={totalDespesas} 
          totalSaldo={totalSaldo} 
        />

        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "90vw",
            height: "36.2vh",
            alignItems: "center",
          }}
        >
          <MyExpenses despesas={despesas} />
          <MyCards cards={cartoes} />
          <QuickAccess
            onAddReceita={handleAddReceita}
            onAddDespesa={handleAddDespesa}
            onAddCartao={handleAddCartao}
          />
        </Paper>

        <Box
          component="span"
          sx={{
            width: "90vw",
            height: "24.4vh",
          }}
        >
          <LineCharts />
        </Box>
      </main>
    </div>
  );
}
