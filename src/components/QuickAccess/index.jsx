import React from "react";
import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import "./style.css";

export default function QuickAccess() {
    return (
        <Card
  className="acesso-rapido-card"
  sx={{
    height: '21.5vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }}
>
  <CardContent
    sx={{
      paddingTop: 0, // <-- remove espaço extra no topo
      paddingLeft: 0,
      paddingRight: 0,
      paddingBottom: 0,
    }}
  >
    <Typography
      variant="h5"
      component="div"
      sx={{
        paddingLeft: '1vw', // você pode manter esse se quiser recuo lateral
        marginTop: 0,
      }}
    >
      Acesso Rápido
    </Typography>

    <Box className="botoes-container">
      <Box>
        <IconButton
          sx={{
            backgroundColor: '#f0f0f0',
            color: 'black',
            marginBottom: '0.5rem',
          }}
        >
          <Add />
        </IconButton>
        <Typography className="botao-texto">Receitas</Typography>
      </Box>

      <Box>
        <IconButton
          sx={{
            backgroundColor: '#f0f0f0',
            color: 'black',
            marginBottom: '0.5rem',
          }}
        >
          <Add />
        </IconButton>
        <Typography className="botao-texto">Saldos</Typography>
      </Box>

      <Box>
        <IconButton
          sx={{
            backgroundColor: '#f0f0f0',
            color: 'black',
            marginBottom: '0.5rem',
          }}
        >
          <Add />
        </IconButton>
        <Typography className="botao-texto">Cartões</Typography>
      </Box>

      <Box>
        <IconButton
          sx={{
            backgroundColor: '#f0f0f0',
            color: 'black',
            marginBottom: '0.5rem',
          }}
        >
          <Remove />
        </IconButton>
        <Typography className="botao-texto">Despesas</Typography>
      </Box>
    </Box>
  </CardContent>
</Card>

    );
}
