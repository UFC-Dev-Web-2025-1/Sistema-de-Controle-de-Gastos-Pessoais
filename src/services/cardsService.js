import apiService from './apiService';

export const cardsService = {
  // Buscar todos os cartões
  async getAllCards() {
    return await apiService.get('/api/cartaos?populate=*');
  },

  // Buscar cartão por ID
  async getCardById(id) {
    return await apiService.get(`/api/cartaos/${id}?populate=*`);
  },

  // Criar novo cartão
  async createCard(cardData) {
    const newCard = {
      nome: cardData.nome,
      numero: cardData.numero,
      validade: cardData.validade,
      cvv: cardData.cvv,
    };
    return await apiService.post('/api/cartaos', newCard);
  },

  // Atualizar cartão
  async updateCard(id, cardData) {
    const updateData = {
      nome: cardData.nome,
      numero: cardData.numero,
      validade: cardData.validade,
      cvv: cardData.cvv,
    };
    return await apiService.put(`/api/cartaos/${id}`, updateData);
  },

  // Deletar cartão
  async deleteCard(id) {
    return await apiService.delete(`/api/cartaos/${id}`);
  },

  // Atualizar saldo do cartão
  async updateCardBalance(id, novoSaldo) {
    return await apiService.put(`/api/cartaos/${id}`, { saldo: novoSaldo });
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
};

export default cardsService;
