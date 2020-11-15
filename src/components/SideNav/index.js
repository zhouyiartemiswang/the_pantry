import React from 'react';
import { Drawer, Toolbar, List, ListItem, ListItemText, makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
}));

export default function SideNav() {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                <List>
                    {[
                        ['Dashboard', 'dashboard'],
                        ['My Cake Master', 'cake'],
                        ['Orders', 'receipt'],
                        ['Inventory', 'list'],
                        ['Account', 'account_box']
                    ].map((text) => (
                        <ListItem button key={text[0]}>
                            <i class="material-icons">{text[1]}</i>
                            <ListItemText primary={text[0]} />
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    )
}


