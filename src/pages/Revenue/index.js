import React from 'react';
import clsx from 'clsx';
import SideNav from '../../components/SideNav';
import Chart from '../../components/Chart';
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
                                        <Chart />
                                    </Paper>
                                </Grid>
                                
                                {/* Insert data form */}
                                <Grid item xs={12}>
                                    <Paper>

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
