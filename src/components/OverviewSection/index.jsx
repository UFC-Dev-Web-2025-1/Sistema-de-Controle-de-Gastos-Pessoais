"use client";
import React from "react";
import DashboardCards from "@/components/FinancialCard";
import "./style.css";

export default function OverviewSection({ totalReceitas, totalDespesas, totalSaldo }) {
    const cardsData = [
        {
            icon: "BanknoteArrowUp",
            value: totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            label: "Receitas",
        },
        {
            icon: "BanknoteArrowDown",
            value: totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            label: "Despesas",
        },
        {
            icon: "DollarSign",
            value: totalSaldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            label: "Saldo",
        },
    ];

    return (
        <section className="overview-container">
            {cardsData.map((cardData, index) => (
                <DashboardCards
                    key={index}
                    title={cardData.label}
                    value={cardData.value}
                    iconName={cardData.icon}
                />
            ))}
        </section>
    );
}
