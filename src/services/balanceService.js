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
      valor: balanceData.valor,
      descricao: balanceData.descricao || 'Atualização de saldo',
      tipo: balanceData.tipo || 'manual', // manual, receita, despesa, transferencia
      categoria: balanceData.categoria || 'Outros',
      data: balanceData.data || new Date().toISOString(),
    };
    return await apiService.post('/api/saldos', newBalance);
  },

  // Atualizar saldo
  async updateBalance(id, balanceData) {
    const updateData = {
      valor: balanceData.valor,
      descricao: balanceData.descricao,
      tipo: balanceData.tipo,
      categoria: balanceData.categoria,
      data: balanceData.data,
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
    return await apiService.get(`/api/saldos?filters[data][$gte]=${startDate}&filters[data][$lte]=${endDate}&sort[0]=createdAt:desc&populate=*`);
  },

  // Buscar saldos por tipo
  async getBalancesByType(tipo) {
    return await apiService.get(`/api/saldos?filters[tipo][$eq]=${tipo}&sort[0]=createdAt:desc&populate=*`);
  },

  // Adicionar receita (aumenta saldo)
  async addIncome(incomeData) {
    const income = {
      valor: Math.abs(parseFloat(incomeData.valor)), // Garantir valor positivo
      descricao: incomeData.descricao || 'Receita',
      tipo: 'receita',
      categoria: incomeData.categoria || 'Receita',
      data: incomeData.data || new Date().toISOString(),
    };
    return await apiService.post('/api/saldos', income);
  },

  // Registrar despesa (diminui saldo)
  async addExpense(expenseData) {
    const expense = {
      valor: -Math.abs(parseFloat(expenseData.valor)), // Garantir valor negativo
      descricao: expenseData.descricao || 'Despesa',
      tipo: 'despesa',
      categoria: expenseData.categoria || 'Despesa',
      data: expenseData.data || new Date().toISOString(),
    };
    return await apiService.post('/api/saldos', expense);
  },

  // Fazer transferência entre contas/cartões
  async makeTransfer(transferData) {
    const transfer = {
      valor: parseFloat(transferData.valor),
      descricao: transferData.descricao || 'Transferência',
      tipo: 'transferencia',
      categoria: 'Transferência',
      data: transferData.data || new Date().toISOString(),
      contaOrigem: transferData.contaOrigem,
      contaDestino: transferData.contaDestino,
    };
    return await apiService.post('/api/saldos', transfer);
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

  // Obter relatório financeiro mensal
  async getMonthlyReport(year, month) {
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();
    
    try {
      const balances = await this.getBalanceHistory(startDate, endDate);
      
      let receitas = 0;
      let despesas = 0;
      let transferencias = 0;

      balances.forEach(balance => {
        const valor = parseFloat(balance.attributes?.valor || balance.valor || 0);
        const tipo = balance.attributes?.tipo || balance.tipo;

        switch (tipo) {
          case 'receita':
            receitas += valor;
            break;
          case 'despesa':
            despesas += Math.abs(valor);
            break;
          case 'transferencia':
            transferencias += Math.abs(valor);
            break;
        }
      });

      return {
        periodo: { year, month },
        receitas,
        despesas,
        transferencias,
        saldo: receitas - despesas,
        registros: balances.length,
      };
    } catch (error) {
      console.error('Erro ao gerar relatório mensal:', error);
      throw error;
    }
  },
};

export default balanceService;
