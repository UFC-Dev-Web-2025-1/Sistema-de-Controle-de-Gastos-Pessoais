import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import "./style.css";

export default function NavBar({page})
{
    let styleInicio = {backgroundColor: '#242529'};
    let styleRelatorio = {backgroundColor: '#242529'};
    let styleDespesas = {backgroundColor: '#242529'};
    let styleAjustes = {backgroundColor: '#242529'};

    switch(page){
        case 'inicio':
            styleInicio = {backgroundColor: '#37393F'};
            break;
        case 'relatorio':
            styleRelatorio = {backgroundColor: '#37393F'};
            break;
        case 'despesas':
            styleDespesas = {backgroundColor: '#37393F'};
            break;
        case 'ajustes':
            styleAjustes = {backgroundColor: '#37393F'};
            break;
        default:
            break;
    }


    return(
        <Box>
            <AppBar  sx={{backgroundColor: "#242529", height: "7.2vh"}}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between", paddingBottom: "1.2vh"}}>
                    <div className="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e3e3e3"><path d="M240-520q-83 0-141.5-58.5T40-720q0-84 58.5-142T240-920q84 0 142 58t58 142q0 83-58 141.5T240-520Zm0-60q59.5 0 99.75-40.83Q380-661.67 380-720q0-59.5-40.25-99.75T240-860q-58.33 0-99.17 40.25Q100-779.5 100-720q0 58.33 40.83 99.17Q181.67-580 240-580ZM620-40q-24.75 0-42.37-17.63Q560-75.25 560-100v-240q0-24.75 17.63-42.38Q595.25-400 620-400h240q24.75 0 42.38 17.62Q920-364.75 920-340v240q0 24.75-17.62 42.37Q884.75-40 860-40H620Zm0-60h240v-240H620v240Zm120-120ZM240-720Zm475 48L288-246q7 12 10.5 25.65Q302-206.7 302-192q0 45-32 77.5T192.05-82Q147-82 114.5-114.5T82-192.05Q82-238 114.5-270t77.5-32q14.7 0 28.35 3.5Q234-295 246-288l426-427q-7-12-10.5-25.5T658-768q0-46 32.5-78t77.55-32Q814-878 846-846t32 77.95q0 45.05-32 77.55T768-658q-14 0-27.5-3.5T715-672Z"/></svg>
                        <p>FINEXA</p>
                    </div>

                    <div className="navigation">
                        <Link href="/inicio">
                            <button style={styleInicio}>Início</button>
                        </Link>
                        <Link href="/relatorios">
                            <button style={styleRelatorio}>Relatório</button>
                        </Link>
                        <Link href="/despesas">
                            <button style={styleDespesas}>Despesas</button>
                        </Link>
                        <Link href="/ajustes">
                            <button style={styleAjustes}>Ajustes</button>
                        </Link>
                    </div>
                    <div className="logo"></div>
                </Toolbar>
            </AppBar>
        </Box>
    );

}