import apiService from './apiService';

export const userService = {
  // Buscar todos os usuários
  async getAllUsers() {
    return await apiService.get('/users?populate=*');
  },

  // Buscar usuário por ID
  async getUserById(id) {
    return await apiService.get(`/users/${id}?populate=*`);
  },

  // Buscar usuário atual (me)
  async getCurrentUser() {
    return await apiService.get('/users/me?populate=*');
  },

  // Criar novo usuário (registro)
  async createUser(userData) {
    const newUser = {
      username: userData.username,
      email: userData.email,
      password: userData.password,
      nome: userData.nome,
      telefone: userData.telefone || '',
      endereco: userData.endereco || '',
    };
    return await apiService.post('/auth/local/register', newUser);
  },

  // Atualizar usuário
  async updateUser(id, userData) {
    const updateData = {
      username: userData.username,
      email: userData.email,
      nome: userData.nome,
      telefone: userData.telefone,
      endereco: userData.endereco,
    };
    return await apiService.put(`/users/${id}`, updateData);
  },

  // Atualizar usuário atual
  async updateCurrentUser(userData) {
    return await apiService.put('/users/me', userData);
  },

  // Login do usuário
  async login(credentials) {
    const loginData = {
      identifier: credentials.email || credentials.username,
      password: credentials.password,
    };
    return await apiService.post('/auth/local', loginData);
  },

  // Logout (remover token do cliente)
  async logout() {
    // Como o Strapi não tem endpoint de logout, apenas removemos o token localmente
    localStorage.removeItem('authToken');
    return { success: true };
  },

  // Verificar se usuário está autenticado
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  // Salvar token de autenticação
  saveAuthToken(token) {
    localStorage.setItem('authToken', token);
  },

  // Obter token de autenticação
  getAuthToken() {
    return localStorage.getItem('authToken');
  },

  // Remover token de autenticação
  removeAuthToken() {
    localStorage.removeItem('authToken');
  },

  // Esqueci minha senha
  async forgotPassword(email) {
    return await apiService.post('/auth/forgot-password', { email });
  },

  // Resetar senha
  async resetPassword(code, password, passwordConfirmation) {
    return await apiService.post('/auth/reset-password', {
      code,
      password,
      passwordConfirmation,
    });
  },

  // Buscar usuários por critério
  async searchUsers(searchTerm) {
    return await apiService.get(`/users?filters[$or][0][username][$containsi]=${searchTerm}&filters[$or][1][email][$containsi]=${searchTerm}&filters[$or][2][nome][$containsi]=${searchTerm}&populate=*`);
  },

  // Deletar usuário (apenas para admins)
  async deleteUser(id) {
    return await apiService.delete(`/users/${id}`);
  },

  // === DESPESAS DO USUÁRIO ===
  
  // Buscar todas as despesas do usuário atual
  async getUserExpenses() {
    return await apiService.get('/despesas?filters[usuario][$eq]=$user&populate=*');
  },

  // Buscar despesas de um usuário específico
  async getUserExpensesById(userId) {
    return await apiService.get(`/despesas?filters[usuario][id][$eq]=${userId}&populate=*`);
  },

  // Buscar despesas do usuário por período
  async getUserExpensesByDateRange(startDate, endDate) {
    return await apiService.get(`/despesas?filters[usuario][$eq]=$user&filters[data][$gte]=${startDate}&filters[data][$lte]=${endDate}&populate=*`);
  },

  // Buscar despesas do usuário por categoria
  async getUserExpensesByCategory(categoria) {
    return await apiService.get(`/despesas?filters[usuario][$eq]=$user&filters[categoria][$eq]=${categoria}&populate=*`);
  },

  // === CARTÕES DO USUÁRIO ===
  
  // Buscar todos os cartões do usuário atual
  async getUserCards() {
    return await apiService.get('/cartoes?filters[usuario][$eq]=$user&populate=*');
  },

  // Buscar cartões de um usuário específico
  async getUserCardsById(userId) {
    return await apiService.get(`/cartoes?filters[usuario][id][$eq]=${userId}&populate=*`);
  },

  // Criar novo cartão para o usuário
  async createUserCard(cardData) {
    const newCard = {
      nome: cardData.nome,
      numero: cardData.numero,
      bandeira: cardData.bandeira,
      limite: cardData.limite,
      vencimento: cardData.vencimento,
      usuario: cardData.usuario, // ID do usuário
    };
    return await apiService.post('/cartoes', newCard);
  },

  // === SALDOS DO USUÁRIO ===
  
  // Buscar saldo atual do usuário
  async getUserBalance() {
    return await apiService.get('/saldos?filters[usuario][$eq]=$user&sort[0]=createdAt:desc&pagination[limit]=1&populate=*');
  },

  // Buscar histórico de saldos do usuário
  async getUserBalanceHistory() {
    return await apiService.get('/saldos?filters[usuario][$eq]=$user&sort[0]=createdAt:desc&populate=*');
  },

  // Buscar saldos de um usuário específico
  async getUserBalanceById(userId) {
    return await apiService.get(`/saldos?filters[usuario][id][$eq]=${userId}&sort[0]=createdAt:desc&populate=*`);
  },

  // Atualizar saldo do usuário
  async updateUserBalance(balanceData) {
    const newBalance = {
      valor: balanceData.valor,
      descricao: balanceData.descricao || 'Atualização de saldo',
      usuario: balanceData.usuario, // ID do usuário
    };
    return await apiService.post('/saldos', newBalance);
  },

  // === ESTATÍSTICAS DO USUÁRIO ===
  
  // Buscar resumo financeiro do usuário
  async getUserFinancialSummary() {
    try {
      const [expenses, cards, balance] = await Promise.all([
        this.getUserExpenses(),
        this.getUserCards(),
        this.getUserBalance(),
      ]);

      // Calcular totais
      const totalExpenses = expenses.reduce((sum, expense) => {
        const value = parseFloat(expense.attributes?.valor || expense.valor || 0);
        return sum + value;
      }, 0);

      const totalCardLimit = cards.reduce((sum, card) => {
        const limit = parseFloat(card.attributes?.limite || card.limite || 0);
        return sum + limit;
      }, 0);

      const currentBalance = balance[0] ? parseFloat(balance[0].attributes?.valor || balance[0].valor || 0) : 0;

      return {
        totalExpenses,
        totalCardLimit,
        currentBalance,
        expensesCount: expenses.length,
        cardsCount: cards.length,
        expenses,
        cards,
        balance: balance[0] || null,
      };
    } catch (error) {
      console.error('Erro ao buscar resumo financeiro:', error);
      throw error;
    }
  },
};

export default userService;
