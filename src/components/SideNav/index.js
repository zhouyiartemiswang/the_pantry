import React from 'react';
import clsx from 'clsx';
import { Drawer, List, ListItem, ListItemText, IconButton, makeStyles } from '@material-ui/core';
import './style.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
}));

export default function SideNav(props) {
    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            classes={{
                paper: clsx(classes.drawerPaper, !props.open && classes.drawerPaperClose),
            }}
            open={props.open}
        >
            <div className={classes.toolbarIcon}>
                <IconButton onClick={props.handleDrawerClose}>
                    <span class="material-icons">chevron_left</span>
                </IconButton>
            </div>
            <List>
                {[
                    ['Dashboard', 'dashboard'],
                    ['My Cake Master', 'cake'],
                    ['Orders', 'assignment'],
                    ['Inventory', 'list'],
                    ['Account', 'account_box']
                ].map((text) => (
                    <ListItem button key={text[0]}>
                        <i class="material-icons">{text[1]}</i>
                        <ListItemText primary={text[0]} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}


