import {Card, CardContent, Typography} from '@mui/material';
import ItemList from '../ItemList';

export default function MyExpenses()
{
    const expensesMonthly = [
  { id: 1, name: "Supermercado", value: 320.75 },
  { id: 2, name: "Internet", value: 89.90 },
  { id: 3, name: "Água", value: 45.60 },
  { id: 4, name: "Energia elétrica", value: 150.00 },
  { id: 5, name: "Streaming", value: 34.90 },
  { id: 6, name: "Gasolina", value: 280.00 },
  { id: 7, name: "Farmácia", value: 65.00 },
  { id: 8, name: "Almoço fora", value: 120.00 }
];


    return (
        <Card sx={{
            width: '30vw',
            height: '27vh'
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Typography variant='h6' component='div' sx={{
                    paddingLeft: '1vw'
                }}>
                    Minhas Despesas
                </Typography>
                <ItemList
                type='expenses-monthly'
                contents={expensesMonthly}
                width='28.7vw'
                />
            </CardContent>

        </Card>
    );
}