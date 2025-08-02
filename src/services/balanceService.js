import apiService from './apiService';

export const balanceService = {
  // Buscar todos os saldos
  async getAllBalances() {
    return await apiService.get('/api/saldos?populate=*&sort[0]=createdAt:desc');
  },

  // Buscar saldo por ID
  async getBalanceById(id) {
    return await apiService.get(`/api/saldos/${id}?populate=*`);
  },

  // Criar novo registro de saldo
  async createBalance(balanceData) {
    const newBalance = {
      nome: balanceData.nome,
      valor: balanceData.valor,
    };
    return await apiService.post('/api/saldos', newBalance);
  },

  // Atualizar saldo
  async updateBalance(id, balanceData) {
    const updateData = {
      nome: balanceData.nome,
      valor: balanceData.valor,
    };
    return await apiService.put(`/api/saldos/${id}`, updateData);
  },

  // Deletar saldo
  async deleteBalance(id) {
    return await apiService.delete(`/api/saldos/${id}`);
  },

  // Buscar saldo atual
  async getCurrentBalance() {
    return await apiService.get(`/api/saldos?sort[0]=createdAt:desc&pagination[limit]=1&populate=*`);
  },

  // Buscar histórico de saldos por período
  async getBalanceHistory(startDate, endDate) {
    return await apiService.get(`/api/saldos?filters[createdAt][$gte]=${startDate}&filters[createdAt][$lte]=${endDate}&sort[0]=createdAt:desc&populate=*`);
  },

  // Buscar saldos por tipo
  async getBalancesByType(tipo) {
    return await apiService.get(`/api/saldos?sort[0]=createdAt:desc&populate=*`);
  },

  // Adicionar receita (aumenta saldo)
  async addIncome(incomeData) {
    const income = {
      nome: incomeData.nome || 'Receita',
      valor: Math.abs(parseFloat(incomeData.valor)),
    };
    return await apiService.post('/api/saldos', income);
  },

  // Registrar despesa (diminui saldo)
  async addExpense(expenseData) {
    const expense = {
      nome: expenseData.nome || 'Despesa',
      valor: -Math.abs(parseFloat(expenseData.valor)),
    };
    return await apiService.post('/api/saldos', expense);
  },

  

  // Calcular saldo total
  async calculateTotalBalance() {
    try {
      const allBalances = await apiService.get(`/api/saldos?populate=*`);
      
      const total = allBalances.reduce((sum, balance) => {
        const value = parseFloat(balance.attributes?.valor || balance.valor || 0);
        return sum + value;
      }, 0);

      return {
        total,
        registros: allBalances.length,
        ultimaAtualizacao: allBalances[0]?.attributes?.createdAt || allBalances[0]?.createdAt || null,
      };
    } catch (error) {
      console.error('Erro ao calcular saldo total:', error);
      throw error;
    }
  },
};

export default balanceService;
