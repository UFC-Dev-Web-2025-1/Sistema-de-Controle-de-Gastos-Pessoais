'use client';
import { useState, useEffect, useMemo } from "react";
import { Box, Paper } from "@mui/material";
import MyExpenses from "@/components/MyExpenses";
import MyCards from "@/components/MyCards";
import QuickAccess from "@/components/QuickAccess";
import LineCharts from "@/components/LineCharts";
import OverviewSection from "@/components/OverviewSection";
import NavBar from "@/components/NavBar";
import { balanceService } from "@/services/balanceService";
import { expensesService } from "@/services/expensesService";
import { cardsService } from "@/services/cardsService";
import styles from "@/app/page.module.css";

export default function Dashboard() {

  const receitasPadrao = [];
  const despesasPadrao = [];
  const cartaoPadrao = [];

  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState(despesasPadrao);
  const [cartoes, setCartoes] = useState(cartaoPadrao);

  // Carregar receitas da API
  useEffect(() => {
    const loadReceitas = async () => {
      try {
        const response = await balanceService.getAllBalances();
        console.log('Receitas da API:', response);
        const receitasFromAPI = response.map(item => ({
          id: item.id,
          name: item.nome,
          value: item.valor
        }));
        console.log('Receitas mapeadas:', receitasFromAPI);
        setReceitas(receitasFromAPI);
      } catch (error) {
        console.error('Erro ao carregar receitas:', error);
        setReceitas(receitasPadrao);
      }
    };

    loadReceitas();
  }, []);

  // Carregar despesas da API
  useEffect(() => {
    const loadDespesas = async () => {
      try {
        const response = await expensesService.getAllExpenses();
        console.log('Despesas da API:', response);
        const despesasFromAPI = response.map(item => ({
          id: item.id,
          name: item.nome,
          value: item.valor
        }));
        console.log('Despesas mapeadas:', despesasFromAPI);
        setDespesas(despesasFromAPI);
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
        setDespesas(despesasPadrao);
      }
    };

    loadDespesas();
  }, []);

  // Carregar cartões da API
  useEffect(() => {
    const loadCartoes = async () => {
      try {
        const response = await cardsService.getAllCards();
        console.log('Cartões da API:', response);
        const cartoesFromAPI = response.map(item => ({
          id: item.id,
          name: item.nome || 'Cartão',
          value: 0, // ou algum valor padrão
          type: item.tipo || 'crédito',
          numero: item.numero,
          validade: item.validade,
          cvv: item.cvv
        }));
        console.log('Cartões mapeados:', cartoesFromAPI);
        setCartoes(cartoesFromAPI);
      } catch (error) {
        console.error('Erro ao carregar cartões:', error);
        setCartoes(cartaoPadrao);
      }
    };

    loadCartoes();
  }, []);


  const handleAddReceita = async (novaReceita) => {
    // Atualizar o estado local imediatamente
    const receitaComId = { ...novaReceita, id: Date.now() };
    setReceitas((prev) => [...prev, receitaComId]);
  };

  const handleAddDespesa = (novaDespesa) => {
    // Atualizar o estado local imediatamente
    const despesaComId = { ...novaDespesa, id: Date.now() };
    setDespesas((prev) => [...prev, despesaComId]);
  };

  const handleAddCartao = (novoCartao) => {
    // Atualizar o estado local imediatamente
    const cartaoComId = { ...novoCartao, id: Date.now() };
    setCartoes((prev) => [...prev, cartaoComId]);
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
