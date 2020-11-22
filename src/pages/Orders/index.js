import React, { useState, useEffect } from 'react';
import SideNav from '../../components/SideNav';
import OrderTable from '../../components/OrderTable';
import { Container, Grid, Typography, TableContainer, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    title: {
        marginTop: 10,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
    },
    table: {
        minWidth: 650,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
    },
    appBarSpacer: theme.mixins.toolbar,
}));

export default function Orders(props) {
    const classes = useStyles();

    const [orderState, setOrderState] = useState([]);
    const [editButtonState, setEditButtonState] = useState({
        id: "",
        status: "",
        clicked: false
    });
    const [pendingOrdersState, setPendingOrdersState] = useState([]);
    const [inProgressOrdersState, setInProgressOrdersState] = useState([]);
    const [completedOrdersState, setCompletedOrdersState] = useState([]);

    useEffect(() => {
        // API.getAllOrders().then(res => {
        setOrderState([
            {
                id: "1",
                description: "pre-made",
                sale: 100,
                deadline: "December 4, 2020",
                status: "In Progress"
            },
            {
                id: "2",
                description: "pre-made",
                sale: 90,
                deadline: "December 1, 2020",
                status: "In Progress"
            },

        ])
        filterTable(orderState);
        // console.log(pendingOrders, inProgressOrders, completedOrders);
        // })
    }, [])

    const filterTable = (orderList) => {
        let pendingOrders = orderList.filter(order => order.status === "Pending");
        let inProgressOrders = orderList.filter(order => order.status === "In Progress");
        let completedOrders = orderList.filter(order => order.status === "Completed");
        setPendingOrdersState(pendingOrders);
        setInProgressOrdersState(inProgressOrders);
        setCompletedOrdersState(completedOrders);
        // console.log(inProgressOrdersState);
    }

    const handleItemSave = event => {
        let newArray = orderState.map(order => {
            console.log(event.target);
            console.log(event.target.id, editButtonState.status);
            if (order.id === event.target.id) {
                order.status = editButtonState.status;
            }
            return order;
        })

        setEditButtonState({
            id: "",
            status: "",
            clicked: false
        })

        // console.log(newArray);
        setOrderState(newArray)
        // console.log("Save button clicked", editButtonState);
        // API call to save changes
    }

    return (
        <>
            <div className={classes.appBarSpacer} />
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                    <Container maxWidth="lg" className={classes.container}>

                        <Grid container spacing={3}>

                            {/* Pending Orders */}
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Typography className={classes.title} component="h2" variant="h6" color="primary" gutterBottom>
                                        Pending Orders
                                    </Typography>
                                    <OrderTable orders={pendingOrdersState} handleItemSave={handleItemSave} />
                                </TableContainer>
                            </Grid>

                            {/* In Progress Orders */}
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Typography className={classes.title} component="h2" variant="h6" color="primary" gutterBottom>
                                        In Progress Orders
                                    </Typography>
                                    <OrderTable orders={inProgressOrdersState} handleItemSave={handleItemSave} />
                                </TableContainer>
                            </Grid>

                            {/* Completed Orders */}
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Typography className={classes.title} component="h2" variant="h6" color="primary" gutterBottom>
                                        Completed Orders
                                    </Typography>
                                    <OrderTable orders={completedOrdersState} handleItemSave={handleItemSave} />
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Container>
                </>
                :
                <div>
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
                </div>
            }
        </>
    );
}