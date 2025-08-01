// API Base Configuration para Strapi
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337/api';
const API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.token = API_TOKEN;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        // Adicionar o token de autorização se existir
        ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Strapi retorna dados em formato { data: [...] }, vamos extrair apenas os dados
      return data.data || data;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint);
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify({ data }), // Strapi espera dados dentro de { data: ... }
    });
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify({ data }), // Strapi espera dados dentro de { data: ... }
    });
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

export default new ApiService();
