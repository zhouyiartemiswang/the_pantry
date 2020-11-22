import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import SideNav from '../../components/SideNav';
import Chart from '../../components/Chart';
import InventoryAlert from '../../components/InventoryAlert';
import OrderList from '../../components/OrderList';
import { CssBaseline, Container, Grid, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0,
        }
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
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

export default function Dashboard(props) {
    const classes = useStyles();
    const [inventoryState, setInventoryState] = useState([]);
    const [lowStockItem, setLowStockItem] = useState("");

    useEffect(() => {
        // console.log(props.profile)
        const token = localStorage.getItem("token");
        API.getBaker(token).then(res => {
            if (res) {
                setInventoryState(res.Inventories);
                checkStock(res.Inventories);
            }
        })
    }, [])

    const checkStock = (inventory) => {
        let lowStockItemArray = [];
        inventory.map(item => {
            // console.log(parseFloat(item.quantity));
            if (parseFloat(item.quantity) < 5) {
                console.log(item.name);
                lowStockItemArray.push(item.name);
                console.log(lowStockItemArray);
            }
            return lowStockItemArray;
        })
        setLowStockItem(lowStockItemArray);
    }

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                    <CssBaseline />
                    <main id="content-container" className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>

                            <Grid container spacing={3}>
                                {/* Monthly Earnings Chart */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper className={fixedHeightPaper}>
                                        {/* <Chart /> */}
                                    </Paper>
                                </Grid>

                                {/* Inventory Alerts */}
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper className={fixedHeightPaper}>
                                        {lowStockItem.length > 0 ?
                                            <InventoryAlert lowStockItem={lowStockItem} />
                                            : null
                                        }
                                    </Paper>
                                </Grid>

                                {/* Recent Orders */}
                                <Grid item xs={12}>
                                    <OrderList />
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </>
                :
                <div>
                    <div className={classes.appBarSpacer} />
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
                </div>
            }
        </div>
    )
}
