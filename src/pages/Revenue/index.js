import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import SideNav from '../../components/SideNav';
import Chart from '../../components/Chart';
import RevenueDataForm from '../../components/RevenueDataForm';
import { Container, Grid, Paper, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        padding: theme.spacing(3),
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
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
        height: 350,
    },
}));

export default function Revenue(props) {
    const classes = useStyles();
    const [monthlyEarning, setMonthlyEarning] = useState({
        January: "",
        February: "",
        March: ""
    });
    const [dataState, setDataState] = useState([]);

    useEffect(() => {
        // Get all revenue data
        const res = [
            {
                month: "January",
                year: "2020",
                sales: 50,
                ingredients: 30,
                description: "something"
            },
            {
                month: "January",
                year: "2020",
                sales: 45,
                ingredients: 35,
                description: "something2"
            }
        ]
        let janData = res.filter(data => data.month === "January");
        let sum = 0;
        let janSum = janData.map(data => {
            sum += data.sales - data.ingredients
            return sum;
        })
        console.log(janSum[janSum.length - 1]);

        setMonthlyEarning({
            ...monthlyEarning,
            January: janSum[janSum.length - 1]
        })
        
        const data = [
            {
                month: "January",
                earning: 30
            },
            {
                month: "February",
                earning: 100
            },
            {
                month: "March",
                earning: 200
            },
            {
                month: "April",
                earning: 180
            }
        ]
        setDataState(data);
    }, [])

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    return (
        <div>
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                    <main id="content-container" className={classes.content}>
                        <div className={classes.appBarSpacer} />
                        <Container maxWidth="lg" className={classes.container}>

                            <Grid container spacing={3}>
                                {/* Monthly Earnings Chart */}
                                <Grid item xs={12}>
                                    <Paper className={fixedHeightPaper}>
                                        <Chart data={dataState}/>
                                    </Paper>
                                </Grid>

                                {/* Insert data form */}
                                <Grid item xs={12}>
                                    <Paper>
                                        <RevenueDataForm />
                                    </Paper>
                                </Grid>
                            </Grid>
                        </Container>
                    </main>
                </>
                :
                <div>
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
                </div>
            }
        </div>
    )
}
