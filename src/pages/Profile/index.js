import React, { useState, useEffect } from 'react';
import UserProfile from '../../components/UserProfile';
import SideNav from '../../components/SideNav';
import Drawer from '../../components/Drawer';
import Dashboard from '../../components/Dashboard';
import { CssBaseline, Container, makeStyles } from '@material-ui/core';
import './style.css';

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

export default function Profile(props) {
    const classes = useStyles();
    // const [isOwner, setIsOwner] = useState("");

    // useEffect(() => {
    //     setIsOwner(false);
    // }, []);

    return (
        <>
            <div className={classes.appBarSpacer} />
            {props.isOwner ?
                (<div className={classes.root}>
                    <CssBaseline />
                    {/* <SideNav /> */}
                    <Drawer/>
                    <main className={classes.content}>
                        <Container maxWidth="lg" className={classes.container}>
                            <Dashboard />
                        </Container>
                    </main>
                </div>)
                : <UserProfile />
            }
        </>
    )
}
