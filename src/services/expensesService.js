import apiService from './apiService';

export const expensesService = {
  // Buscar todas as despesas
  async getAllExpenses() {
    return await apiService.get('/api/despesas?populate=*');
  },

  // Buscar despesa por ID
  async getExpenseById(id) {
    return await apiService.get(`/api/despesas/${id}?populate=*`);
  },

  // Criar nova despesa
  async createExpense(expenseData) {
    const newExpense = {
      nome: expenseData.nome,
      valor: expenseData.valor,
    };
    console.log('Dados enviados para API:', JSON.stringify(newExpense, null, 2));
    return await apiService.post('/api/despesas', newExpense);
  },

  // Atualizar despesa
  async updateExpense(id, expenseData) {
    return await apiService.put(`/api/despesas/${id}`, expenseData);
  },

  // Deletar despesa
  async deleteExpense(id) {
    return await apiService.delete(`/api/despesas/${id}`);
  },



  // Buscar despesas por período
  async getExpensesByDateRange(startDate, endDate) {
    return await apiService.get(`/api/despesas?filters[data][$gte]=${startDate}&filters[data][$lte]=${endDate}&populate=*`);
  },

  // Buscar despesas do usuário atual
  async getCurrentUserExpenses() {
    return await apiService.get('/api/despesas?filters[usuario][$eq]=$user&populate=*');
  },

  // Buscar despesas por usuário específico
  async getExpensesByUser(userId) {
    return await apiService.get(`/api/despesas?filters[usuario][id][$eq]=${userId}&populate=*`);
  },

  // Buscar despesas por cartão
  async getExpensesByCard(cardId) {
    return await apiService.get(`/api/despesas?filters[cartao][id][$eq]=${cardId}&populate=*`);
  },

  // Buscar despesas por categoria e usuário
  async getExpensesByCategoryAndUser(categoria, userId) {
    return await apiService.get(`/api/despesas?filters[categoria][$eq]=${categoria}&filters[usuario][id][$eq]=${userId}&populate=*`);
  },

  // Buscar despesas recorrentes
  async getRecurringExpenses(userId) {
    return await apiService.get(`/api/despesas?filters[usuario][id][$eq]=${userId}&filters[recorrente][$eq]=true&populate=*`);
  },

  // Calcular total de despesas por período
  async calculateExpensesTotal(userId, startDate, endDate) {
    try {
      const expenses = await apiService.get(`/api/despesas?filters[usuario][id][$eq]=${userId}&filters[data][$gte]=${startDate}&filters[data][$lte]=${endDate}&populate=*`);
      
      const total = expenses.reduce((sum, expense) => {
        const value = parseFloat(expense.attributes?.valor || expense.valor || 0);
        return sum + value;
      }, 0);

      return {
        total,
        count: expenses.length,
        expenses,
      };
    } catch (error) {
      console.error('Erro ao calcular total de despesas:', error);
      throw error;
    }
  },

  // Obter despesas agrupadas por categoria
  async getExpensesByCategory(userId, startDate = null, endDate = null) {
    try {
      let url = `/api/despesas?filters[usuario][id][$eq]=${userId}&populate=*`;
      
      if (startDate && endDate) {
        url += `&filters[data][$gte]=${startDate}&filters[data][$lte]=${endDate}`;
      }

      const expenses = await apiService.get(url);
      
      const groupedByCategory = {};
      
      expenses.forEach(expense => {
        const categoria = expense.attributes?.categoria || expense.categoria || 'Outros';
        const valor = parseFloat(expense.attributes?.valor || expense.valor || 0);
        
        if (!groupedByCategory[categoria]) {
          groupedByCategory[categoria] = {
            total: 0,
            count: 0,
            expenses: [],
          };
        }
        
        groupedByCategory[categoria].total += valor;
        groupedByCategory[categoria].count += 1;
        groupedByCategory[categoria].expenses.push(expense);
      });

      return groupedByCategory;
    } catch (error) {
      console.error('Erro ao agrupar despesas por categoria:', error);
      throw error;
    }
  },
};
