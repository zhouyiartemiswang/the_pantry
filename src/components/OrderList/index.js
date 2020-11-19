import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function OrderList() {
    const classes = useStyles();
    const [orderState, setOrderState] = useState([]);

    useEffect(() => {
        API.getAllOrders().then(res => {
            setOrderState(res)
        })
    }, [])

    // account for the fact the user may not have items (Cannot read property 'map' of null)
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Order Number</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Sale ($)</TableCell>
                        <TableCell align="center">Deadline</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderState.map((row) => (
                        <TableRow key={row.orderNumber}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">{row.sale}</TableCell>
                            <TableCell align="center">{row.deadline}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}