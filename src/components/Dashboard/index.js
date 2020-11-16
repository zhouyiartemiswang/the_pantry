import React from 'react';
import clsx from 'clsx';
import InventoryAlert from '../InventoryAlert';
import OrderList from '../OrderList';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));

export default function Dashboard() {
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <Grid container spacing={3}>
            {/* Monthly Earnings Chart */}
            <Grid item xs={12} md={8} lg={9}>
                <Paper className={fixedHeightPaper}>
                </Paper>
            </Grid>

            {/* Inventory Alerts */}
            <Grid item xs={12} md={4} lg={3}>
                <Paper className={fixedHeightPaper}>
                    <InventoryAlert />
                </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
                <OrderList />
            </Grid>
        </Grid>
    )
}
