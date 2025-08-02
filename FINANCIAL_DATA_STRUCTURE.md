# Estrutura de Dados - Usuário, Despesas, Cartões e Saldos

## 📊 Relacionamentos no Strapi

### Content Types necessários:

#### 1. **User** (já existe no Strapi)
```javascript
{
  id: number,
  username: string,
  email: string,
  password: string (criptografada),
  // Campos personalizados:
  nome: string,
  telefone: string,
  endereco: string,
  // Relacionamentos:
  despesas: Relation (hasMany - despesas),
  cartoes: Relation (hasMany - cartoes),
  saldos: Relation (hasMany - saldos)
}
```

#### 2. **Despesa**
```javascript
{
  id: number,
  nome: string,
  valor: decimal/string,
  categoria: string,
  data: datetime,
  descricao: text,
  recorrente: boolean,
  // Relacionamentos:
  usuario: Relation (belongsTo - users-permissions_user),
  cartao: Relation (belongsTo - cartoes) // opcional
}
```

#### 3. **Cartao**
```javascript
{
  id: number,
  nome: string, // Nome do cartão (ex: "Nubank", "Cartão Principal")
  saldo: decimal, // Saldo atual usado do cartão
  limite: decimal, // Limite total do cartão
  // Relacionamentos:
  usuario: Relation (belongsTo - users-permissions_user),
  despesas: Relation (hasMany - despesas)
}
```

#### 4. **Saldo**
```javascript
{
  id: number,
  valor: decimal,
  descricao: string,
  tipo: enumeration, // 'manual', 'receita', 'despesa', 'transferencia'
  categoria: string,
  data: datetime,
  // Relacionamentos:
  usuario: Relation (belongsTo - users-permissions_user),
  // Campos opcionais para transferências:
  contaOrigem: string,
  contaDestino: string
}
```

## 🔧 Serviços Criados:

### 1. **userService.js** (Expandido)
- ✅ CRUD básico de usuários
- ✅ Autenticação e tokens
- ✅ **Novos:** Métodos para buscar despesas, cartões e saldos do usuário
- ✅ **Novos:** Resumo financeiro consolidado
- ✅ **Novos:** Estatísticas do usuário

### 2. **expensesService.js** (Atualizado)
- ✅ CRUD de despesas
- ✅ **Atualizado:** Relacionamento com usuário e cartão
- ✅ **Novos:** Filtros por usuário, cartão, categoria
- ✅ **Novos:** Cálculos e agrupamentos

### 3. **cardsService.js** (Novo - Simplificado)
- ✅ CRUD de cartões (nome, saldo, limite, usuário)
- ✅ Relacionamento com usuário
- ✅ Gestão de saldo vs limite
- ✅ Adicionar/remover gastos do cartão
- ✅ Verificação de saldo disponível

### 4. **balanceService.js** (Novo)
- ✅ CRUD de saldos
- ✅ Tipos: receita, despesa, transferência
- ✅ Histórico de saldos
- ✅ Relatórios mensais
- ✅ Cálculo de saldo total

## 🎣 Hooks Criados:

### 1. **useFinancialData**
```javascript
const { expenses, cards, balance, summary, loading, error, refreshData } = useFinancialData();
```
- Busca todos os dados financeiros do usuário
- Calcula resumo consolidado
- Recarregamento automático

### 2. **useExpenses**
```javascript
const { expenses, loading, error, refetch } = useExpenses({ 
  category: 'Alimentação',
  startDate: '2025-01-01',
  endDate: '2025-01-31'
});
```
- Busca despesas com filtros
- Suporte a categoria e período

### 3. **useCards**
```javascript
const { cards, loading, error, addCard, updateCard, deleteCard, refetch } = useCards();
```
- Gerenciamento completo de cartões
- CRUD integrado

### 4. **useBalance**
```javascript
const { balance, history, loading, error, addIncome, addExpense, refetch } = useBalance();
```
- Gerenciamento de saldo
- Histórico de movimentações
- Adicionar receitas/despesas

## 🔄 Fluxo de Dados:

### 1. **Quando usuário se autentica:**
```javascript
// useAuth hook automaticamente:
1. Salva token no localStorage
2. Atualiza contexto global
3. Hooks financeiros começam a buscar dados
```

### 2. **Quando usuário adiciona despesa:**
```javascript
// Fluxo automático:
1. expensesService.createExpense() → Cria despesa linkada ao usuário
2. Se tiver cartão → Link com cartão específico
3. balanceService.addExpense() → Atualiza saldo automaticamente
4. Hooks recarregam dados automaticamente
```

### 3. **Dashboard atualizado:**
```javascript
// Componentes ficam atualizados automaticamente:
- ExpensesBoard → Lista despesas do usuário
- CardsSection → Mostra cartões do usuário
- BalanceCard → Saldo atual
- FinancialSummary → Resumo consolidado
```

## 📝 Exemplo de Uso:

### Componente Dashboard:
```javascript
function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { expenses, cards, balance, summary, loading } = useFinancialData();
  
  if (!isAuthenticated) return <LoginModal />;
  if (loading) return <Loading />;
  
  return (
    <div>
      <h1>Olá, {user.nome}!</h1>
      <FinancialSummary summary={summary} />
      <ExpensesBoard items={expenses} />
      <CardsSection cards={cards} />
      <BalanceCard balance={balance} />
    </div>
  );
}
```

## 🎯 Próximos Passos:

- [ ] Configurar Content Types no Strapi Admin
- [ ] Testar relacionamentos no Strapi
- [ ] Atualizar componentes existentes para usar novos hooks
- [ ] Implementar dashboard financeiro
- [ ] Adicionar gráficos e relatórios
- [ ] Implementar notificações de limite de cartão
- [ ] Adicionar backup e sincronização

## ⚠️ Importantes:

1. **Permissões no Strapi:** Configurar que usuários só vejam seus próprios dados
2. **Validação:** Implementar validações de limite de cartão
3. **Segurança:** Não expor dados sensíveis como CVV
4. **Performance:** Implementar paginação para grandes volumes
5. **Offline:** Considerar cache local para dados críticos
