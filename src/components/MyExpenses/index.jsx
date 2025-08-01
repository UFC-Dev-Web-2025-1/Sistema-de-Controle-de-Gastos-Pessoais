import {Card, CardContent, Typography} from '@mui/material';
import ItemList from '../ItemList';

export default function MyExpenses({despesas = []})
{
    return (
        <Card sx={{
            width: '30vw',
            height: '21.5vh'
        }}>
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
            }}>
                <Typography variant='h5' component='div' sx={{
                    paddingLeft: '1vw'
                }}>
                    Minhas Despesas
                </Typography>
                <ItemList
                type='expenses-monthly'
                contents={despesas}
                width='28.7vw'
                />
            </CardContent>

        </Card>
    );
}