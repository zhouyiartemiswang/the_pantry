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

    // we dont save favorites in the database
	// there should be a filter at the top to filter by bakery
	// the bakery list in the filter should include the bakery address
	// there's no reason to have the vertical dots on the cards
	// the cards should be created based on an array length, not hard coding 3 cards to the page
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
