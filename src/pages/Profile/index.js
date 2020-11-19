import React, { useState, useEffect } from 'react';
import UserProfile from '../../components/UserProfile';
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
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
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

    // both user and owner should have the same profile page layout (as the owners should be able to make orders as well. database will be updated for this)
    // you shouldn't be allowed to access the profile page if you aren't logged in
    return (
        <>
            <div className={classes.appBarSpacer} />
            {props.isOwner ?
                (<div className={classes.root}>
                    <CssBaseline />
                    <main id="content-container" className={classes.content}>
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
