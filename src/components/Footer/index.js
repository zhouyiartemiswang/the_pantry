import React from 'react';
import { Container, Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    footer: {
        padding: theme.spacing(3, 2),
        width: "100vw",
        marginTop: 10,
        zIndex: 100,
        position: "fixed",
        bottom: 0,
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
}));

export default function Footer() {
    const classes = useStyles();

    return (
        <footer className={classes.footer} >
            <Container maxWidth="sm">
                <Typography variant="body2" color="textSecondary" align="center">
                    {'Copyright © '}
                    <Link color="inherit" href="/">
                        The Pantry
                        </Link>
                    {' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </footer >
    )
}
