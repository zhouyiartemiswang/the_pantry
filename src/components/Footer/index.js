import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
import { Container, Typography, Link, makeStyles } from '@material-ui/core';
import './style.css';

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
    footerHome: {
        backgroundColor: "black",
    },
}));

function Footer(props) {
    const classes = useStyles();

    const [isHomePage, setIsHomePage] = useState("");

    useEffect(() => {
        if (props.location.pathname === "/") {
            setIsHomePage(true);
            // console.log("homepage")
        } else {
            setIsHomePage(false)
            // console.log(props.location.pathname);
        }

    }, [])

    return (
        < footer className={clsx(classes.footer, {[classes.footerHome]: isHomePage})} >
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

export default withRouter(Footer);