import { Box, TextField, Button, Typography, Modal, Fade } from "@mui/material";
import { useState } from "react";

export default function AddCartaoModal({ open, onClose, onAddCartao }) {
    const [nome, setNome] = useState('');
    const [numero, setNumero] = useState('');
    const [validade, setValidade] = useState('');
    const [cvv, setCvv] = useState('');

    const formatValidade = (value) => {
        const onlyNums = value.replace(/\D/g, '');
        if (onlyNums.length === 0) return '';
        if (onlyNums.length <= 2) return onlyNums;

        return onlyNums.slice(0, 2) + '/' + onlyNums.slice(2, 4);
    };

    const handleValidadeChange = (e) => {
        const formatted = formatValidade(e.target.value);
        setValidade(formatted);
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        if (!numero.trim() || !validade.trim() || !cvv.trim()) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }


        onAddCartao({
            id: Date.now(),
            name: nome || "Sem nome",
            value: 0,
            type: "crédito",
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
                        label="Nome do Cartão (opcional)"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
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
                        onChange={handleValidadeChange}
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
