import { Box, TextField, Button, Typography, Modal, Fade } from "@mui/material";
import { useState } from "react";
import { cardsService } from "@/services/cardsService";

export default function AddCartaoModal({ open, onClose, onAddCartao }) {
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome.trim() || !numero.trim() || !validade.trim() || !cvv.trim()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Chamar a API
        try {
            const response = await cardsService.createCard({
                nome: nome,
                numero: numero,
                validade: validade,
                cvv: cvv,
            });
            console.log('Cartão criado com sucesso:', response);
        } catch (error) {
            console.error('Erro ao criar cartão:', error);
        }

        onAddCartao({
            id: Date.now(),
            nome,
            numero,
            validade,
            cvv,
        });

        setNome('');
        setNumero('');
        setValidade('');
        setCvv('');
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
                    <Typography variant="h5" sx={{ color: '#202020' }}>Adicionar Cartão</Typography>

                    <TextField
                        label="Nome do Cartão"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        placeholder="Cartão Nubank"
                    />

                    <TextField
                        label="Número do Cartão"
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)}
                        required
                        inputProps={{ maxLength: 19 }}
                        placeholder="1234 5678 9012 3456"
                    />

                    <TextField
                        label="Validade (MM/AA)"
                        value={validade}
                        onChange={(e) => setValidade(e.target.value)}
                        required
                        placeholder="08/33"
                        inputProps={{ maxLength: 5 }}
                    />

                    <TextField
                        label="Código de Segurança (CVV)"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        required
                        type="password"
                        inputProps={{ maxLength: 3 }}
                        placeholder="123"
                    />

                    <Button type="submit" variant="contained" color="primary">
                        Adicionar Cartão
                    </Button>
                </Box>
            </Fade>
        </Modal>
    );
}
