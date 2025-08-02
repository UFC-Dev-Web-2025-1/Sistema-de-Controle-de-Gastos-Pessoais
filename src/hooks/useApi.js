'use client';
import { useState, useEffect } from 'react';

// Hook simples para buscar dados da API
export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (error) {
      console.error('Erro na API:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Executa apenas uma vez quando o componente carrega

  return { data, loading, error, refetch: fetchData };
}

export { useApi };
