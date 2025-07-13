import {Card, CardContent, Typography} from '@mui/material';
import ItemList from '../ItemList';

export default function MyCards()
{
    const cards = [
  { id: 1, name: "Visa Gold", value: 1500.00, type: "crédito" },
  { id: 2, name: "Master Black", value: 2450.60, type: "débito" },
  { id: 3, name: "Elo Mais", value: 980.45, type: "crédito" },
  { id: 4, name: "Nubank", value: 3200.00, type: "débito" },
  { id: 5, name: "Inter", value: 890.75, type: "crédito" },
  { id: 6, name: "Santander Free", value: 610.00, type: "débito" },
  { id: 7, name: "Inter", value: 890.75, type: "crédito" },
  { id: 8, name: "Inter", value: 890.75, type: "crédito" },
  { id: 9, name: "Inter", value: 890.75, type: "crédito" }
];

    return (
        <Card sx={{
            width: '38vw',
            height: '27vh',
            alignSelf: 'flex-end',
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Typography variant='h6' component='div' sx={{
                    paddingLeft: '1vw'
                }}>
                    Meus Cartões
                </Typography>
                <ItemList
                type='cards'
                contents={cards}
                width='35.7vw'
                />
            </CardContent>

        </Card>
    );
}