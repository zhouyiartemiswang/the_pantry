import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import SideNav from '../../components/SideNav';
import Chart from '../../components/Chart';
import InventoryAlert from '../../components/InventoryAlert';
import OrderList from '../../components/OrderList';
import { CssBaseline, Container, Grid, Paper, makeStyles } from '@material-ui/core';
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
        height: 400,
    },
}));

export default function Dashboard(props) {
    const classes = useStyles();
    const [lowStockItem, setLowStockItem] = useState([]);
    const [dataState, setDataState] = useState([]);
    const [revenueState, setRevenueState] = useState([]);

    useEffect( function() {
        if(props.baker.revenue){
            let joinedArray = [];
            for(let i = 0; i < props.baker.revenue.length; i++){
                let duplicate = false;
                if(parseInt(props.baker.revenue[i].baker_id) === parseInt(props.profile.id)){
                    if( i === 0){
                        let sales = parseFloat(props.baker.revenue[0].sales) - parseFloat(props.baker.revenue[0].ingredients);
                        joinedArray.push({month: props.baker.revenue[0].month.split(" ")[0], year: props.baker.revenue[0].month.split(" ")[1], earnings: sales});
                    }
                    else{
                        for(let j = 0; j < joinedArray.length; j++){
                            if(`${joinedArray[j].month} ${joinedArray[j].year}` === props.baker.revenue[i].month){
                                duplicate = true;
                                let sales = parseFloat(joinedArray[j].earnings) + parseFloat(props.baker.revenue[i].sales) - parseFloat(props.baker.revenue[i].ingredients);
                                joinedArray[j].earnings = sales;
                            }
                        }
                        if(duplicate){
                            duplicate = false;
                        }
                        else{
                            let sales = parseFloat(props.baker.revenue[i].sales) - parseFloat(props.baker.revenue[i].ingredients);
                            joinedArray.push({month: props.baker.revenue[i].month.split(" ")[0], year: props.baker.revenue[i].month.split(" ")[1], earnings: sales});
                        }
                    }

                }
            }
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            const sorter = (a, b) => {
                if(a.year !== b.year){
                    return a.year - b.year;
                }else{
                    return months.indexOf(a.month) - months.indexOf(b.month);
                };
            };
            joinedArray.sort(sorter);
            let sortedArray = [];
            for(let i = 0; i < joinedArray.length; i ++){
                sortedArray.push({month: `${joinedArray[i].month} ${joinedArray[i].year}`, earnings: joinedArray[i].earnings});
            }
            setRevenueState(props.baker.revenue);
            setDataState(sortedArray);
        }

        let lowStockItemArray = [];
        if (props.baker.inventory) {
            for (let i = 0; i < props.baker.inventory.length; i++) {
                if (props.baker.inventory[i].quantity < 5) {
                    lowStockItemArray.push(props.baker.inventory[i].name);
                }
            }
            setLowStockItem(lowStockItemArray);
        }
    }, [props.baker]);

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
                                        <Chart data={dataState} />
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
                                    <OrderList baker={props.baker} />
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </>
                :
                <div>
                    <div className={classes.appBarSpacer} />
                    <br/>
                    <br/>
                    <br/>
                    <h2 style={{ textAlign: "center" }}>You are not authorized to view this page. Please log in!</h2>
                </div>
            }
        </div>
    )
}
