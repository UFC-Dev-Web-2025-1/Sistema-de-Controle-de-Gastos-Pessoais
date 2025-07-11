import { Divider, List } from "@mui/material";
import Item from "../Item";
import { Fragment } from "react";




export default function ItemList({ contents, type, width }) {

    if (type === 'expenses-daily') {
        return (
            <List sx={{
                width: width,
                height: '8vh',
            }}>
                {contents.map((content) => (
                    <Fragment key={content.id}>
                        <Item
                            width={width}
                            name={content.name}
                            value={content.value}
                            itemType={'expenses-daily'}
                        />
                        <Divider variant="inset" />
                    </Fragment>
                ))}

            </List>
        );
    }
    else if (type === 'expenses-monthly') {
        return (
            <List sx={{
                display: 'grid',
                gridTemplateColumns: contents.length > 3 ? '1fr 1fr' : '1fr',
                gap: '1vh',
                width: width,
                height: '5.3vh',
            }}>
                {contents.map((content) => (
                    <Fragment key={content.id}>
                        <Item
                            width={width}
                            name={content.name}
                            value={content.value}
                            itemType={'expenses-monthly'}
                        />
                    </Fragment>
                ))}
            </List>
        );
    }
    else {
        return (
            <List sx={{
                display: 'grid',
                gridTemplateColumns: contents.length > 3 ? '1fr 1fr' : '1fr',
                gap: '1vh',
                width: width,
                height: '5.3vh',
            }}>
                {contents.map((content) => (
                    <Item
                        width={width}
                        key={content.id}
                        name={content.name}
                        type={content.type}
                        value={content.value}
                        itemType={'card'}
                    />
                ))}
            </List>
        );
    }
}