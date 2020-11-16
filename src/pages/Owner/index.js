import React, { useState } from 'react';
import OwnerNavBar from '../../components/OwnerNavBar';
import SideNav from '../../components/SideNav';
import Dashboard from '../../components/Dashboard';
import Inventory from '../../components/Inventory';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';
import './style.css';
import InventoryAlert from '../../components/InventoryAlert';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function Owner(props) {

    const classes = useStyles();

    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />

            <OwnerNavBar
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                page={props.page}
            />

            <SideNav
                open={open}
                handleDrawerClose={handleDrawerClose}
            />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    {props.page === "Dashboard" ? <Dashboard /> : <Inventory />}
                </Container>
            </main>
        </div>
    );
}
