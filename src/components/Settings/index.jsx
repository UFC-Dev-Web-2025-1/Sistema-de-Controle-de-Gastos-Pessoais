import {
  Avatar,
  Box,
  Divider,
  IconButton,
  MenuItem,
  Select,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const listTextStyle = {
  slotProps: {
    primary: {
      sx: { color: 'text.primary' },
    },
  },
};




export default function Settings({name, email}) {
  return (
    <Paper
      elevation={3}
      sx={{
        marginTop: 0, 
        p: 3,
        mt: 0,
        borderRadius: 3,
        width: "80vw",
        mx: "auto",
        backgroundColor: '#fafafa'
      }}
    >
      <Box
        className="settings-container"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
      >
      {/* Título */}
      <Typography variant="h5" fontWeight="bold" gutterBottom color="text.primary">
        Ajustes
      </Typography>

      {/* Perfil */}
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Avatar sx={{ bgcolor: 'grey', width: 48, height: 48 }}></Avatar>
        <Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color='text.primary'>Nome: {name}</Typography>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" color = "text.primary">E-mail: {email}</Typography>
            <IconButton size="small">
              <EditIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Preferências */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color="text.primary">
        Preferências
      </Typography>
      <Box mb={3} width="100%">
        <Box display="flex" alignItems="center" mb={2}>
          <Typography color = "text.primary" sx={{ width: 80 }}>Idioma:</Typography>
          <Select defaultValue="pt">
            <MenuItem value="pt">Português</MenuItem>
            <MenuItem value="en">Inglês</MenuItem>
          </Select>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography color = "text.primary" sx={{ width: 80 }}>Tema:</Typography>
          <Select defaultValue="claro">
            <MenuItem value="claro">Claro</MenuItem>
            <MenuItem value="escuro">Escuro</MenuItem>
          </Select>
        </Box>
      </Box>

      {/* Suporte */}
      <Typography variant="h6" fontWeight="bold" gutterBottom color = "text.primary">
        Suporte
      </Typography>
      <List dense sx={{ width: '100%' }}>
        <ListItem>
          <ListItemText primary="Ajuda" {...listTextStyle}/> 
        </ListItem>
        <ListItem>
          <ListItemText primary="FAQ" {...listTextStyle}/>
        </ListItem>
        <ListItem>
          <ListItemText primary="Fale conosco" {...listTextStyle}/>
        </ListItem>
      </List>
      </Box>
    </Paper>
  );
}