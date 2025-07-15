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
                flexDirection: 'column',
                gap: '1vh',
                width: width,
                height: '17vh',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
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
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5vh',
                width: width,
                height: '17vh',
                overflowY: 'auto',
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none'
                }
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