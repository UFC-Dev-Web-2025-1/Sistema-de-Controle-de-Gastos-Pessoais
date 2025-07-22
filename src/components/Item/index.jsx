import { CreditCard, BanknoteArrowDown, Pencil, Plane } from "lucide-react";
import "./style.css";
import '@fontsource/roboto/400.css';
import {ListItem, ListItemText, Typography} from '@mui/material';


export default function Item({ name, value, type, itemType, width }) {

  let icon = (<CreditCard className="icon" strokeWidth={1} />);

  let description = (
    <>
      <Typography variant="body1" component='span' sx={{
        display: 'flex',
        margin: 0,
        width: '8.4vw',        
      }}>{name}</Typography>
      <Typography variant="caption" component='span' sx={{
        display: 'flex',
        marginTop: '-0.6vh',
        marginBottom: 0
      }}>{type}</Typography>
    </>
  );

  let detail = (
    <Typography variant="body1" sx={{textAlign:'end',width: '10vw'}} >
      {"R$ " + value}
    </Typography>
  );

  if (itemType == 'expenses-monthly') {
    icon = (<BanknoteArrowDown className="icon" strokeWidth={1} />);
    description = (
      <Typography variant="body1" component='span' sx={{
        display: 'flex',
        margin: 0,
        width: '8.4vw',
        alignSelf: 'center'
      }}>{name}</Typography>
    );
  }


  if (itemType == 'expenses-daily') {
    icon = (<Plane style={{
        width: '1.7vw',
        height: '4vh',
        strokeWidth: 1
      }} />);

    description = (
      <>
        <Typography variant="subtitle1" component='span' sx={{
          display: 'flex',
          margin: 0,
          marginRight: '0.8vh',
        }}>{name}</Typography>
        <Typography variant="body2" component='span' sx={{
          display: 'flex',
          marginTop: '-0.6vh',
          marginBottom: 0
        }}>{'R$ ' + value}</Typography>
      </>
    );

    detail = (
      <Pencil style={{
        width: '1.7vw',
        height: '4vh',
        strokeWidth: 1
      }} />
    );

    return (
      <ListItem sx={{
        fontFamily: 'Roboto',
        display: 'flex',
        paddingRight: '1.3vw',
        paddingLeft: '1.1vw',
        width: width,
        height: '8vh',
        flexDirection: 'row',
        justifyContent: 'space-between',
        color: 'black',
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          {icon}
          <ListItemText sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '8.4vw',
            height: '5.3vh',
          }}
          >
            {description}
          </ListItemText>
        </div>
        {detail}
      </ListItem>
    );
  }
  return (
    <ListItem sx={{
      fontFamily: 'Roboto',
      display: 'flex',
      paddingRight: '1.3vw',
      paddingLeft: '1.1vw',
      width: width,
      height: '5.3vh',
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: 'black'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: '1vw',
      }}>
      {icon}
      <ListItemText sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '8.4vw',
        height: '5.3vh',
      }}
      >
        {description}
      </ListItemText>
      </div>
      {detail}
    </ListItem>
  );
}
