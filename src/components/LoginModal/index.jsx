import { Box, TextField, Button, Typography, Modal, Fade } from "@mui/material";
import { useState } from "react";
import Link from "next/link";

export default function LoginModal({ open, cancelModal, handleOpenRegister }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Registrado!");
        cancelModal();
    }

    const Hidden = {
        position: 'absolute',
        width: 1,
        height: 1,
        padding: 0,
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        border: 0,
    };

    return (
        <>
            {/* {Descrição para acessibiladade} */}
            <Typography id='login-modal-describe' sx={Hidden}>
                Insira seu e-mail e senha para entrar na FINEXA.
            </Typography>
            <Modal
                open={open}
                onClose={cancelModal}
                aria-labelledby='login-modal-title'
                aria-describedby='login-modal-describe'
            >

                <Fade in={open}>
                    <Box component='form' autoComplete='off' onSubmit={handleSubmit}
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '55.5vw',
                            height: '88.8vh',
                            background: '#FFFFFF',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}

                    >
                        <Typography id='login-modal-title' variant="h3" sx={{ color: '#202020' }}>
                            Entre na sua conta
                        </Typography>
                        <TextField
                            required
                            label='E-mail'
                            placeholder='Insira seu e-mail'
                            type='text'
                            value={email}
                            onChange={(e) => (setEmail(e.target.value))}
                            autoComplete='off'
                            sx={{
                                width: '31.25vw',
                                height: '9.5vh'
                            }}
                        />

                        <TextField
                            required
                            label='Senha'
                            placeholder='Insira sua senha'
                            type='password'
                            value={password}
                            onChange={(e) => (setPassword(e.target.value))}
                            sx={{
                                width: '31.25vw',
                                height: '9.5vh'
                            }}
                        />

                        <Typography variant="body1" sx={{ color: '#202020' }}>
                            Não tem uma conta? <a href='#'  onClick={handleOpenRegister} style={{textDecoration: 'underline'}}>Inscreva-se</a>
                        </Typography>
                        <Link href='/inicio'>
                        <Button type='submit'
                            sx={{
                                width: '50vw',
                                height: '9.8vh',
                                color: '#FFFFFF',
                                backgroundColor: '#202020'
                            }}
                        >
                            Entrar
                        </Button>
                        </Link>
                    </Box>
                </Fade>
                
            </Modal>
        </>
    );
}