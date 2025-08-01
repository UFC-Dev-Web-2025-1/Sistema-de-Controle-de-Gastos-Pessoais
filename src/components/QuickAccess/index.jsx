'use client';

import React, { useState } from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import AddReceitaModal from "@/components/QuickAcessModals/AddReceitaModal";
import AddDespesaModal from "@/components/QuickAcessModals/AddDespesaModal";
import AddCartaoModal from "@/components/QuickAcessModals/AddCartaoModal";

import "./style.css";



export default function QuickAccess({ onAddReceita, onAddDespesa, onAddCartao }) {
  const [openReceita, setOpenReceita] = useState(false);
  const [openDespesa, setOpenDespesa] = useState(false);
  const [openCartao, setOpenCartao] = useState(false);
  return (
    <>
      <Card className="acesso-rapido-card" sx={{ height: '21.5vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
        <CardContent sx={{ paddingTop: 0, paddingLeft: 0, paddingRight: 0, paddingBottom: 0 }}>
          <Typography variant="h5" sx={{ paddingLeft: '1vw' }}>
            Acesso Rápido
          </Typography>

          <Box className="botoes-container">
            <Box>
              <IconButton onClick={() => setOpenReceita(true)} sx={{ backgroundColor: '#f0f0f0', color: 'black', marginBottom: '0.5rem' }}>
                <Add />
              </IconButton>
              <Typography className="botao-texto">Receitas</Typography>
            </Box>

            <Box>
              <IconButton onClick={() => setOpenDespesa(true)} sx={{ backgroundColor: '#f0f0f0', color: 'black', marginBottom: '0.5rem' }}>
                <Remove />
              </IconButton>
              <Typography className="botao-texto">Despesas</Typography>
            </Box>

            <Box>
              <IconButton onClick={() => setOpenCartao(true)} sx={{ backgroundColor: '#f0f0f0', color: 'black', marginBottom: '0.5rem' }}>
                <Add />
              </IconButton>
              <Typography className="botao-texto">Cartões</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Modais */}
      <AddReceitaModal
        open={openReceita}
        onClose={() => setOpenReceita(false)}
        onAddReceita={onAddReceita}
      />
      <AddDespesaModal
        open={openDespesa}
        onClose={() => setOpenDespesa(false)}
        onAddDespesa={onAddDespesa}
      />

      <AddCartaoModal
        open={openCartao}
        onClose={() => setOpenCartao(false)}
        onAddCartao={onAddCartao}
      />


    </>
  );
}
