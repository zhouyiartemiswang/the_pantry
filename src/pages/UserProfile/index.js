import React, { useState, useEffect } from 'react';
import { Paper, Avatar, Typography, Link, Toolbar, makeStyles } from '@material-ui/core';
import PlacedOrderList from '../../components/PlacedOrderList/PlacedOrderList';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "auto",
        marginTop: theme.spacing(20),
        width: "40vw",
        textAlign: "center",

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
        fontFamily: "IBM Plex Serif",
        margin: "1vw",
    },
}));

export default function Profile(props) {
    const classes = useStyles();

    const [orderListState, setOrderListState] = useState({
        list: []
    });

    useEffect( function() {
        let newArray = [];
        if(props.buyer.orders){
            for (let i = 0; i < props.buyer.orders.length; i++){
                newArray.push(<PlacedOrderList data={props.buyer.orders[i]} key={props.buyer.orders[i].id} classes={classes} />)
            }
            setOrderListState({ list: newArray });
        }
    }, [props.buyer]);
    
    return (
        <>
            <Toolbar />
            {props.profile.isLoggedIn ?
                <div className={classes.root}>

                    <Paper className="profile-container">
                        <Typography className={classes.heading}>
                            {props.profile.name}
                        </Typography>
                        <Typography className={classes.heading}>
                            {props.profile.email}
                        </Typography>
                        <Typography className={classes.heading}>
                            {props.profile.phone}
                        </Typography>
                        <Typography className={classes.heading}>
                            {props.profile.address}
                        </Typography>

                        {orderListState.list}
                        
                    </Paper>

                </div>
                :
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <h2 style={{ textAlign: "center" }}>You are not authorized to view this page. Please log in!</h2>
                </div>
            }
        </>
    );
}