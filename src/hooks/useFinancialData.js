'use client';
import { useState, useEffect } from 'react';
import { expensesService } from '@/services/expensesService';
import cardsService from '@/services/cardsService';
import balanceService from '@/services/balanceService';

// Hook para gerenciar dados financeiros
export const useFinancialData = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    expenses: [],
    cards: [],
    balance: null,
    summary: null,
  });

  // Buscar todos os dados financeiros
  const fetchFinancialData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [expenses, cards, balanceHistory] = await Promise.all([
        expensesService.getAllExpenses(),
        cardsService.getAllCards(),
        balanceService.getAllBalances(),
      ]);

      // Calcular resumo
      const totalExpenses = expenses.reduce((sum, expense) => {
        return sum + parseFloat(expense.attributes?.valor || expense.valor || 0);
      }, 0);

      const currentBalance = balanceHistory[0] ? 
        parseFloat(balanceHistory[0].attributes?.valor || balanceHistory[0].valor || 0) : 0;

      const summary = {
        totalExpenses,
        currentBalance,
        expensesCount: expenses.length,
        cardsCount: cards.length,
      };

      setData({
        expenses,
        cards,
        balance: balanceHistory[0] || null,
        summary,
      });

    } catch (err) {
      console.error('Erro ao buscar dados financeiros:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Recarregar dados
  const refreshData = () => {
    fetchFinancialData();
  };

  // Carregar dados quando componente montar
  useEffect(() => {
    fetchFinancialData();
  }, []);

  return {
    ...data,
    loading,
    error,
    refreshData,
  };
};

// Hook para gerenciar despesas específicas
export const useExpenses = (filters = {}) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);

      let result;
      if (filters.category) {
        result = await expensesService.getExpensesByCategory(filters.category);
      } else if (filters.startDate && filters.endDate) {
        result = await expensesService.getExpensesByDateRange(filters.startDate, filters.endDate);
      } else {
        result = await expensesService.getAllExpenses();
      }

      setExpenses(result || []);
    } catch (err) {
      console.error('Erro ao buscar despesas:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters.category, filters.startDate, filters.endDate]);

  return {
    expenses,
    loading,
    error,
    refetch: fetchExpenses,
  };
};

// Hook para gerenciar cartões
export const useCards = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCards = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const result = await cardsService.getAllCards();
      setCards(result);
    } catch (err) {
      console.error('Erro ao buscar cartões:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addCard = async (cardData) => {
    try {
      const newCard = await cardsService.createCard({
        nome: cardData.nome,
        saldo: cardData.saldo || 0,
        limite: cardData.limite || 0,
      });
      
      setCards(prev => [...prev, newCard]);
      return { success: true, card: newCard };
    } catch (err) {
      console.error('Erro ao adicionar cartão:', err);
      return { success: false, error: err.message };
    }
  };

  const updateCard = async (cardId, cardData) => {
    try {
      const updatedCard = await cardsService.updateCard(cardId, {
        nome: cardData.nome,
        saldo: cardData.saldo,
        limite: cardData.limite,
      });
      
      setCards(prev => prev.map(card => 
        card.id === cardId ? updatedCard : card
      ));
      
      return { success: true, card: updatedCard };
    } catch (err) {
      console.error('Erro ao atualizar cartão:', err);
      return { success: false, error: err.message };
    }
  };

  const deleteCard = async (cardId) => {
    try {
      await cardsService.deleteCard(cardId);
      
      setCards(prev => prev.filter(card => card.id !== cardId));
      return { success: true };
    } catch (err) {
      console.error('Erro ao deletar cartão:', err);
      return { success: false, error: err.message };
    }
  };

  const addExpenseToCard = async (cardId, valor) => {
    try {
      await cardsService.addExpenseToCard(cardId, valor);
      
      // Atualizar o cartão na lista local
      setCards(prev => prev.map(card => {
        if (card.id === cardId) {
          const currentSaldo = parseFloat(card.attributes?.saldo || card.saldo || 0);
          return {
            ...card,
            saldo: currentSaldo + parseFloat(valor),
            attributes: {
              ...card.attributes,
              saldo: currentSaldo + parseFloat(valor)
            }
          };
        }
        return card;
      }));
      
      return { success: true };
    } catch (err) {
      console.error('Erro ao adicionar gasto ao cartão:', err);
      return { success: false, error: err.message };
    }
  };

  const removeExpenseFromCard = async (cardId, valor) => {
    try {
      await cardsService.removeExpenseFromCard(cardId, valor);
      
      // Atualizar o cartão na lista local
      setCards(prev => prev.map(card => {
        if (card.id === cardId) {
          const currentSaldo = parseFloat(card.attributes?.saldo || card.saldo || 0);
          return {
            ...card,
            saldo: currentSaldo - parseFloat(valor),
            attributes: {
              ...card.attributes,
              saldo: currentSaldo - parseFloat(valor)
            }
          };
        }
        return card;
      }));
      
      return { success: true };
    } catch (err) {
      console.error('Erro ao remover gasto do cartão:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return {
    cards,
    loading,
    error,
    addCard,
    updateCard,
    deleteCard,
    addExpenseToCard,
    removeExpenseFromCard,
    refetch: fetchCards,
  };
};

// Hook para gerenciar saldo
export const useBalance = () => {
  const [balance, setBalance] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError(null);

      const balanceHistory = await balanceService.getAllBalances();

      setBalance(balanceHistory[0] || null);
      setHistory(balanceHistory);

    } catch (err) {
      console.error('Erro ao buscar saldo:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const addIncome = async (incomeData) => {
    try {
      const newIncome = await balanceService.addIncome(incomeData);
      
      await fetchBalance(); // Recarregar dados
      return { success: true, income: newIncome };
    } catch (err) {
      console.error('Erro ao adicionar receita:', err);
      return { success: false, error: err.message };
    }
  };

  const addExpense = async (expenseData) => {
    try {
      const newExpense = await balanceService.addExpense(expenseData);
      
      await fetchBalance(); // Recarregar dados
      return { success: true, expense: newExpense };
    } catch (err) {
      console.error('Erro ao adicionar despesa ao saldo:', err);
      return { success: false, error: err.message };
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return {
    balance,
    history,
    loading,
    error,
    addIncome,
    addExpense,
    refetch: fetchBalance,
  };
};
