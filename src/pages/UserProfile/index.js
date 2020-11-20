import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { Paper, Avatar, Link } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '50%',
        marginTop: 50,
        marginLeft: 350,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function Profile(props) {
    const classes = useStyles();
    // we dont have a favorites section in the database for the users currently
    // we dont allow a user to have multiple addresses
    // the sign out should be in the navbar, not the middle of the page
    // we will eventually want to allow the user to change their username, email, password, and address. but the database currently does not give them that power (on purpose, future feature)
    return (
        <div className={classes.root}>
            <Paper>
                <Avatar alt="avatar" src="#" />
                <Typography className={classes.heading}>
                    Customer Name
                </Typography>
                <Typography className={classes.heading}>
                    customer@gmail.com
                </Typography>
                <Typography className={classes.heading}>
                    (123)456-7890
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
                            Order# 000001, Black Forest Cake, Delivered by December 4, 2020
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
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                            sit amet blandit leo lobortis eget.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                {props.profile.isOwner
                    ? <Link href="/dashboard">Go to Dashboard</Link>
                    : null
                }
            </Paper>
        </div>
    );
}