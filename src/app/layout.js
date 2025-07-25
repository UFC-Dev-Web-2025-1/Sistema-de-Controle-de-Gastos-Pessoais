import "./globals.css";
import { GoogleOAuthProvider } from '@react-oauth/google';


export const metadata = {
    title: "Primeiro App", // Define o título da página - usado para SEO do sistema
    description: "Generated by create next app", // Descrição da página - usado para SEO do sistema
};
const clientId = process.env.CLIENT_ID_OAUTH;
export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
            <body>
                <GoogleOAuthProvider clientId={clientId}>
                    {children}
                </GoogleOAuthProvider>
            </body>
        </html>
    );
}
