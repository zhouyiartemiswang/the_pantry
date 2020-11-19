import React, { useState, useEffect } from 'react';
import { Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function Orders() {
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

    return (
        <>
            <Toolbar />
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