import {Card, CardContent, Typography} from '@mui/material';
import ItemList from '../ItemList';

export default function MyCards({cards = []}) 
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
                    Meus Cartões
                </Typography>
                <ItemList
                type='cards'
                contents={cards}
                width='28.7vw'
                />
            </CardContent>

        </Card>
    );
}