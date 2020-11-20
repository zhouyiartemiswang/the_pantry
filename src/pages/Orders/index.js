import React, { useState, useEffect } from 'react';
import SideNav from '../../components/SideNav';
import { Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
    },
}));

export default function Orders(props) {
    const classes = useStyles();
    const [orderState, setOrderState] = useState([]);

    useEffect(() => {
        // API.getAllOrders().then(res => {
        setOrderState([
            {
                id: "000001",
                description: "pre-made",
                sale: 100,
                deadline: "December 4, 2020",
                status: "in progress"
            },
            {
                id: "000002",
                description: "pre-made",
                sale: 90,
                deadline: "December 1, 2020",
                status: "in progress"
            },

        ])
        // })
    }, [])

    const handleStatusChange = event => {
        // console.log(event.target.id)
        // Set status to complete
    }

    const handleItemDelete = event => {
        // console.log(event.target.id)
        // Delete order
    }
    // edit button should be an edit symbol, not a checkbox.
	// edit button should allow the baker to change the status via a drop down.
	// orders should have different tables based on the current status. 
    // each table should have the heading of the status
    // you shouldn't be allowed to access the orders page if you aren't logged in
    return (
        <>
            <Toolbar />
            <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} isLoggedIn={props.isLoggedIn} isOwner={props.isOwner} />
            <TableContainer component={Paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Order Number</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Sale ($)</TableCell>
                            <TableCell align="center">Deadline</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderState.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.sale}</TableCell>
                                <TableCell align="center">{row.deadline}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
                                <TableCell align="center">
                                    <span 
                                        id={row.id}
                                        className="material-icons"
                                        onClick={handleStatusChange}
                                    >
                                        check_box
                                    </span>
                                    <span 
                                        id={row.id}
                                        className="material-icons"
                                        onClick={handleItemDelete}
                                    >
                                        delete
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}