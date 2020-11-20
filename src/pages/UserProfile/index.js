import React, { useState, useEffect } from 'react';
import { Paper, Avatar, Accordion, AccordionSummary, AccordionDetails, Typography, Link, Toolbar, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "50%",
        textAlign: "center",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Profile(props) {
    const classes = useStyles();
    const [userState, setUserState] = useState({
        username: "",
        email: "",
        phone: "",
        address: "",
        orders: ""
    });

    useEffect(() => {
        setUserState({
            username: "Jane Doe",
            email: "janedoe@gmail.com",
            phone: "(123) 456-7890",
            address: "123 Main St, Seattle, WA",
            orders: "order details here"
        });
    }, [])

    return (
        <>
            <Toolbar />
            {props.isLoggedIn ?
                <div className={classes.root}>

                    <Paper>
                        <Avatar alt={userState.username} src="#" />
                        <Typography className={classes.heading}>
                            {userState.username}
                        </Typography>
                        <Typography className={classes.heading}>
                            {userState.email}
                        </Typography>
                        <Typography className={classes.heading}>
                            {userState.phone}
                        </Typography>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={
                                    <span className="material-icons">expand_more</span>
                                }
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>
                                    <span className="material-icons">shopping_basket</span>
                                    My Orders
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {userState.orders}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {/* <Accordion>
                    <AccordionSummary
                        expandIcon={
                            <span className="material-icons">expand_more</span>
                        }
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography className={classes.heading}>
                            <span className="material-icons">favorite</span>
                            My Favorites
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                    </Typography>
                    </AccordionDetails>
                </Accordion> */}

                        <Accordion>
                            <AccordionSummary
                                expandIcon={
                                    <span className="material-icons">expand_more</span>
                                }
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography className={classes.heading}>
                                    <span className="material-icons">house</span>
                                    My Address
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    {userState.address}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>

                        {props.isOwner
                            ? <Link href="/dashboard">Go to Dashboard</Link>
                            : null
                        }
                    </Paper>
                    
                </div>
                :
                <div>
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page. Please log in!</h1>
                </div>
            }
        </>
    );
}