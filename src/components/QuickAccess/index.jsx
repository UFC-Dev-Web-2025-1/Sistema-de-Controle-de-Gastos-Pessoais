import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "./style.css";

export default function AcessoRapidoCard() {
    return (
        <Card className="acesso-rapido-card">
            <CardContent>
                <Typography
                    sx={{
                        fontFamily: 'Roboto, sans-serif',
                        fontWeight: 500,
                        fontSize: '1.56rem',
                        color: 'black',
                        marginBottom: '1.9rem'
                    }}
                >
                    Acesso Rápido
                </Typography>

                <Box className="botoes-container">
                    <Box >
                        <IconButton
                            sx={{
                                backgroundColor: '#f0f0f0',
                                color: 'black',
                                marginBottom: '0.5rem'
                            }}>
                            <Add />
                        </IconButton>
                        <Typography className="botao-texto">Receita</Typography>
                    </Box>

                    <Box >
                        <IconButton
                            sx={{
                                backgroundColor: '#f0f0f0',
                                color: 'black',
                                marginBottom: '0.5rem'
                            }}>
                            <Remove />
                        </IconButton>
                        <Typography className="botao-texto">Despesas</Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
