import { Box, TextField, Button, Typography, Modal, Fade } from "@mui/material";
import { useState } from "react";
import { expensesService } from "@/services/expensesService";

export default function AddDespesaModal({ open, onClose, onAddDespesa }) {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaDespesa = {
      id: Date.now(),
      name: nome,
      value: parseFloat(valor),
    };

    // Chamar a API
    try {
      const response = await expensesService.createExpense({
        nome: nome,
        valor: parseFloat(valor),
      });
      console.log('Despesa criada com sucesso:', response);
    } catch (error) {
      console.error('Erro ao criar despesa:', error);
    }

    onAddDespesa(novaDespesa);

    setNome('');
    setValor('');

    onClose();
  };


  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40vw',
            bgcolor: 'background.paper',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: '#202020' }}>Adicionar Despesas</Typography>

          <TextField
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />

          <TextField
            label="Valor"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
          />

          <Button type="submit" variant="contained" color="error">
            Adicionar
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}
