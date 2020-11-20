import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import SideNav from '../../components/SideNav';
import InventoryAlert from '../../components/InventoryAlert';
import OrderList from '../../components/OrderList';
import { CssBaseline, Container, Grid, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
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
            console.log(parseFloat(item.quantity));
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

    //add default text when nothing is present like "No open orders"
    return (
        <div className={classes.root}>
            <div className={classes.appBarSpacer} />
            <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} isLoggedIn={props.isLoggedIn} isOwner={props.isOwner} />
            <CssBaseline />
            <main id="content-container" className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>

                    <Grid container spacing={3}>
                        {/* Monthly Earnings Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
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
        </div>
    )
}