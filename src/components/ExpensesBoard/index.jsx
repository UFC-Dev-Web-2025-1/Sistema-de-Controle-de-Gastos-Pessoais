import React, { useState, useEffect } from 'react';
import {
  Paper,
  Typography,
  TextField,
  IconButton,
  Box,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import ItemList from '../ItemList';
import './style.css';

const ExpensesBoard = ({height, width, items = []}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Usar os items passados como prop
  const [expenses, setExpenses] = useState(items);

  // Atualizar expenses quando items mudar
  useEffect(() => {
    console.log('Items recebidos:', items);
    setExpenses(items);
  }, [items]);

  // Filtrar despesas baseado no termo de busca
  const filteredExpenses = expenses.filter(expense =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log('Filtered expenses:', filteredExpenses);

  // Data atual formatada
  const currentDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long'
  }).format(new Date());

  const handleAddExpense = () => {
    console.log('Adicionar nova despesa');
  };

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        borderRadius: 3,
        width: width,
        height: height,
        mx: 'auto',
        mt: 2,
        backgroundColor: '#fafafa',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Cabeçalho */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Despesas
          </Typography>
          <IconButton 
            size="small" 
            onClick={handleAddExpense}  
            sx={{ 
              backgroundColor: '#e0e0e0',
              '&:hover': { backgroundColor: '#d0d0d0' }
            }}
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Chip
          icon={<CalendarIcon />}
          label={currentDate}
          variant="outlined"
          sx={{ 
            borderRadius: 2,
            backgroundColor: 'white',
            '& .MuiChip-icon': { color: '#666' }
          }}
        />
      </Box>

      {/* Campo de Busca */}
      <TextField
        fullWidth
        placeholder="Filtrar por..."
        variant="outlined"
        size="medium"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 3,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
            backgroundColor: 'white',
            '&:hover fieldset': {
              borderColor: '#ccc',
            },
          },
        }}
      />

      {/* Lista de Despesas usando ItemList */}
      <Box className="expenses-list-container" sx={{ flex: 1, minHeight: 0 }}>
        <ItemList 
          contents={filteredExpenses}
          type="expenses-daily"
          width="100%"
          
        />
      </Box>

      {/* Mensagem quando não há resultados */}
      {filteredExpenses.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="body2" color="text.secondary">
            Nenhuma despesa encontrada
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default ExpensesBoard;
