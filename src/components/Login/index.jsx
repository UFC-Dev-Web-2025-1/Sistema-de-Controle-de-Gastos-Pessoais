'use client';
import { useGoogleLogin } from '@react-oauth/google';
import { Typography, Button, Divider, Box } from "@mui/material";
import NavBarLogin from "../NavBar/NavBarLogin/NavBarLogin";
import { useState } from "react";
import LoginModal from "@/components/LoginModal";
import RegisterModal from "@/components/RegisterModal";
import Link from 'next/link';

export default function Login() {

    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const GoogleIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
        </svg>);

    const FinexaIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="#202020">
            <path d="M240-520q-83 0-141.5-58.5T40-720q0-84 58.5-142T240-920q84 0 142 58t58 142q0 83-58 141.5T240-520Zm0-60q59.5 0 99.75-40.83Q380-661.67 380-720q0-59.5-40.25-99.75T240-860q-58.33 0-99.17 40.25Q100-779.5 100-720q0 58.33 40.83 99.17Q181.67-580 240-580ZM620-40q-24.75 0-42.37-17.63Q560-75.25 560-100v-240q0-24.75 17.63-42.38Q595.25-400 620-400h240q24.75 0 42.38 17.62Q920-364.75 920-340v240q0 24.75-17.62 42.37Q884.75-40 860-40H620Zm0-60h240v-240H620v240Zm120-120ZM240-720Zm475 48L288-246q7 12 10.5 25.65Q302-206.7 302-192q0 45-32 77.5T192.05-82Q147-82 114.5-114.5T82-192.05Q82-238 114.5-270t77.5-32q14.7 0 28.35 3.5Q234-295 246-288l426-427q-7-12-10.5-25.5T658-768q0-46 32.5-78t77.55-32Q814-878 846-846t32 77.95q0 45.05-32 77.55T768-658q-14 0-27.5-3.5T715-672Z" />
        </svg>
    );

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);
    const handleOpenRegister = (e) => {
        e.preventDefault();
        setOpenLogin(false);
        setOpenRegister(true);
    }
    const handleCloseRegister = () => setOpenRegister(false);
    const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      alert('Login bem-sucedido!', tokenResponse);
      // Aqui você pode decodificar o token ou enviar para o backend
    },
    onError: () => {
      console.log('Erro no login');
    },
    });

    return (
        <Box>
            <NavBarLogin />
            <Box sx={{
                height: '50vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 0,
                padding: 0,
                marginTop: '15vh'

            }}>
                <Typography variant="h2" sx={{ color: '#202020' }}>
                    Esteja preparado!
                </Typography>
                <Typography variant="h4" sx={{ color: '#202020' }}>
                    Inscreva-se agora
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Link href='/'>
                    <Button startIcon={GoogleIcon}
                        sx={{
                            border: '1px solid #747775',
                            color: '#202020',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            fontSize: '14px',
                            borderRadius: '100px',
                            '&:hover': {
                                borderColor: '#4285F4',
                            }
                        }}
                        onClick={() => loginGoogle()}
                        >
                        Entrar com Google
                    </Button>
                    </Link>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        my: 2
                    }}>
                        <Divider sx={{ flex: '1' }} />
                        <Typography variant="b2" sx={{ color: '#202020', mx: 2 }}>OU</Typography>
                        <Divider sx={{ flex: '1' }} />
                    </Box>
                    <Button startIcon={FinexaIcon}
                        sx={{
                            width: '12.2vw',
                            display: 'flex',
                            justifyContent: 'flex-start',
                            gap: '1.6vw',
                            border: '1px solid #747775',
                            color: '#202020',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            padding: '10px 20px',
                            fontSize: '14px',
                            borderRadius: '100px',
                            '&:hover': {
                                borderColor: '#4285F4',
                            }
                        }}
                        onClick={handleOpenLogin}>
                        Entrar
                    </Button>
                </Box>
            </Box>
            <LoginModal
                cancelModal={handleCloseLogin}
                open={openLogin}
                handleOpenRegister={handleOpenRegister}
            /> 
            <RegisterModal
                open={openRegister}
                cancelModal={handleCloseRegister}
            />
        </Box>
    );
}