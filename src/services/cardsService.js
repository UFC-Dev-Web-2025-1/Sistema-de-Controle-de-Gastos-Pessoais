import apiService from './apiService';

export const cardsService = {
  // Buscar todos os cartões
  async getAllCards() {
    return await apiService.get('/api/cartoes?populate=*');
  },

  // Buscar cartão por ID
  async getCardById(id) {
    return await apiService.get(`/api/cartoes/${id}?populate=*`);
  },

  // Criar novo cartão
  async createCard(cardData) {
    const newCard = {
      nome: cardData.nome,
      saldo: cardData.saldo || 0,
      limite: cardData.limite || 0,
    };
    return await apiService.post('/api/cartoes', newCard);
  },

  // Atualizar cartão
  async updateCard(id, cardData) {
    const updateData = {
      nome: cardData.nome,
      saldo: cardData.saldo,
      limite: cardData.limite,
    };
    return await apiService.put(`/api/cartoes/${id}`, updateData);
  },

  // Deletar cartão
  async deleteCard(id) {
    return await apiService.delete(`/api/cartoes/${id}`);
  },

  // Atualizar saldo do cartão
  async updateCardBalance(id, novoSaldo) {
    return await apiService.put(`/api/cartoes/${id}`, { saldo: novoSaldo });
  },

  // Buscar despesas de um cartão específico
  async getCardExpenses(cardId) {
    return await apiService.get(`/api/despesas?filters[cartao][id][$eq]=${cardId}&populate=*`);
  },

  // Verificar saldo disponível vs limite
  async getCardStatus(cardId) {
    try {
      const card = await this.getCardById(cardId);

      const saldo = parseFloat(card.attributes?.saldo || card.saldo || 0);
      const limite = parseFloat(card.attributes?.limite || card.limite || 0);

      return {
        saldo,
        limite,
        disponivel: limite - saldo,
        percentualUsado: limite > 0 ? (saldo / limite) * 100 : 0,
        podeGastar: saldo < limite,
      };
    } catch (error) {
      console.error('Erro ao verificar status do cartão:', error);
      throw error;
    }
  },

  // Adicionar gasto ao cartão (diminui saldo disponível)
  async addExpenseToCard(cardId, valor) {
    try {
      const card = await this.getCardById(cardId);
      const saldoAtual = parseFloat(card.attributes?.saldo || card.saldo || 0);
      const novoSaldo = saldoAtual + parseFloat(valor);
      
      return await this.updateCardBalance(cardId, novoSaldo);
    } catch (error) {
      console.error('Erro ao adicionar gasto ao cartão:', error);
      throw error;
    }
  },

  // Remover gasto do cartão (aumenta saldo disponível)
  async removeExpenseFromCard(cardId, valor) {
    try {
      const card = await this.getCardById(cardId);
      const saldoAtual = parseFloat(card.attributes?.saldo || card.saldo || 0);
      const novoSaldo = saldoAtual - parseFloat(valor);
      
      return await this.updateCardBalance(cardId, novoSaldo);
    } catch (error) {
      console.error('Erro ao remover gasto do cartão:', error);
      throw error;
    }
  },
};

export default cardsService;
