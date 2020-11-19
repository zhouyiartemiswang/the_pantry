import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import InventoryAlert from '../InventoryAlert';
import OrderList from '../OrderList';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
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
                    {lowStockItem.length > 0 ? 
                    <InventoryAlert lowStockItem={lowStockItem}/>
                    : null
                    }
                </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid item xs={12}>
                <OrderList />
            </Grid>
        </Grid>
    )
}
