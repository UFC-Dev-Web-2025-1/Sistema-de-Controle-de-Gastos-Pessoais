import apiService from './apiService';

export const expensesService = {
  // Buscar todas as despesas
  async getAllExpenses() {
    return await apiService.get('/despesas?populate=*');
  },

  // Buscar despesa por ID
  async getExpenseById(id) {
    return await apiService.get(`/despesas/${id}?populate=*`);
  },

  // Criar nova despesa
  async createExpense(expenseData) {
    const newExpense = {
      nome: expenseData.nome || expenseData.name,
      valor: expenseData.valor || expenseData.amount,
      categoria: expenseData.categoria || expenseData.category,
      data: expenseData.data || expenseData.date || new Date().toISOString(),
      descricao: expenseData.descricao || expenseData.description || '',
    };
    return await apiService.post('/despesas', newExpense);
  },

  // Atualizar despesa
  async updateExpense(id, expenseData) {
    return await apiService.put(`/despesas/${id}`, expenseData);
  },

  // Deletar despesa
  async deleteExpense(id) {
    return await apiService.delete(`/despesas/${id}`);
  },

  // Buscar despesas por categoria
  async getExpensesByCategory(categoria) {
    return await apiService.get(`/despesas?filters[categoria][$eq]=${categoria}&populate=*`);
  },

  // Buscar despesas por período
  async getExpensesByDateRange(startDate, endDate) {
    return await apiService.get(`/despesas?filters[data][$gte]=${startDate}&filters[data][$lte]=${endDate}&populate=*`);
  }
};
