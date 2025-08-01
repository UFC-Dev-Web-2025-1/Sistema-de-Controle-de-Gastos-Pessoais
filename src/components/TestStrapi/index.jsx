'use client';
import { useApi } from '../../hooks/useApi';
import { expensesService } from '../../services/expensesService';

export default function TestStrapi() {
  const { data: despesas, loading } = useApi(expensesService.getAllExpenses);

  if (loading) {
    return <div>Carregando dados do Strapi...</div>;
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd', margin: '20px 0' }}>
      <h2>🧪 Teste de Conexão com Strapi</h2>
      {despesas && despesas.length > 0 ? (
        <div>
          <p>✅ <strong>Conexão funcionando!</strong> {despesas.length} despesas encontradas:</p>
          {despesas.map((despesa, index) => (
            <div key={despesa.id || index} style={{ 
              margin: '10px 0', 
              padding: '10px', 
              border: '1px solid #ccc',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9'
            }}>
              <strong>📝 {despesa.attributes?.nome || despesa.nome || 'Sem nome'}</strong><br />
              💰 Valor: R$ {despesa.attributes?.valor || despesa.valor || '0,00'}<br />
              🏷️ Categoria: {despesa.attributes?.categoria || despesa.categoria || 'Sem categoria'}<br />
              📅 Data: {despesa.attributes?.data ? new Date(despesa.attributes.data).toLocaleDateString('pt-BR') : 'Sem data'}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: '#d32f2f' }}>
          <p>❌ <strong>Nenhuma despesa encontrada.</strong></p>
          <p>Verifique se:</p>
          <ul>
            <li>✅ O Strapi está rodando na porta 1337</li>
            <li>✅ A Collection Type "despesa" foi criada</li>
            <li>✅ Existem registros cadastrados na collection "despesa"</li>
            <li>✅ A API está acessível em: http://localhost:1337/api/despesas</li>
          </ul>
          <p><small>💡 <strong>Dica:</strong> Teste manualmente acessando <a href="http://localhost:1337/api/despesas" target="_blank">http://localhost:1337/api/despesas</a></small></p>
        </div>
      )}
    </div>
  );
}
