import React from 'react';
import CakeMasterCard from '../../components/CakeMasterCard';
import { Container, Grid, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function CakeMasters() {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div className={classes.appBarSpacer} />
            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={4}>
                    <CakeMasterCard/>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <CakeMasterCard/>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <CakeMasterCard/>
                </Grid>
            </Grid>
        </Container>
    )
}
