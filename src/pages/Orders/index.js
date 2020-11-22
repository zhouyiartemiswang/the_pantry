import React, { useState, useEffect } from 'react';
import SideNav from '../../components/SideNav';
import OrderTable from '../../components/OrderTable';
import { Container, Grid, Typography, TableContainer, Paper, makeStyles } from '@material-ui/core';
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

    useEffect( function() {
        let allArray = [];
        let pendingArray = [];
        let inProgressArray = [];
        let completedArray = [];
        if(props.baker.orders){
            for(let i = 0; i < props.baker.orders.length; i++){
                allArray.push(props.baker.orders[i]);
                if(props.baker.orders[i].status.toLowerCase() === "pending"){
                    pendingArray.push(props.baker.orders[i]);
                }
                if(props.baker.orders[i].status.toLowerCase() === "in progress"){
                    inProgressArray.push(props.baker.orders[i]);
                }
                if(props.baker.orders[i].status.toLowerCase() === "completed"){
                    completedArray.push(props.baker.orders[i]);
                }
            }
            setOrderState({list: allArray, pending: pendingArray, progress: inProgressArray, completed: completedArray});
        }
        
    }, [props.baker]);

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
                                    <OrderTable orders={orderState.pending} editButtonState={editButtonState} deleteOne={props.deleteOne} editOne={props.editOne} setEditButtonState={setEditButtonState}/>
                                </TableContainer>
                            </Grid>

                            {/* In Progress Orders */}
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Typography className={classes.title} component="h2" variant="h6" color="primary" gutterBottom>
                                        In Progress Orders
                                    </Typography>
                                    <OrderTable orders={orderState.progress} editButtonState={editButtonState} deleteOne={props.deleteOne} editOne={props.editOne} setEditButtonState={setEditButtonState}/>
                                </TableContainer>
                            </Grid>

                            {/* Completed Orders */}
                            <Grid item xs={12}>
                                <TableContainer component={Paper}>
                                    <Typography className={classes.title} component="h2" variant="h6" color="primary" gutterBottom>
                                        Completed Orders
                                    </Typography>
                                    <OrderTable orders={orderState.completed} editButtonState={editButtonState} deleteOne={props.deleteOne} editOne={props.editOne} setEditButtonState={setEditButtonState}/>
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