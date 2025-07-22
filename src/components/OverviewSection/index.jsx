"use client";
import React from "react";
import DashboardCards from "@/components/FinancialCard";
import "./style.css";

export default function OverviewSection() {
    const cardsData = [
        {
            icon: "BanknoteArrowUp",
            value: "R$20.000,00",
            label: "Receitas",
        },
        {
            icon: "BanknoteArrowDown",
            value: "R$5.000,00",
            label: "Despesas",
        },
        {
            icon: "DollarSign",
            value: "R$15.000,00",
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