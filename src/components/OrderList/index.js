import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

// function createData(orderNumber, type, sale, deadline, status) {
//     return { orderNumber, type, sale, deadline, status };
// }

// const rows = [
//     createData("000001", "pre-made", 100, "December 4, 2020", "in progress" ),
//     createData("000002", "pre-made", 90, "December 2, 2020", "in progress"),
//     createData("000003", "custom", 200, "December 14, 2020", "in progress"),
//     createData("000004", "pre-made", 45, "December 3, 2020", "in progress"),
//     createData("000005", "custom", 300, "December 11, 2020", "in progress"),
// ];

export default function BasicTable() {
    const classes = useStyles();
    const [orderState, setOrderState] = useState([]);

    useEffect(() => {
        API.getAllOrders().then(res => {
            setOrderState(res)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Order Number</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Sale</TableCell>
                        <TableCell align="center">Deadline</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderState.map((row) => (
                        <TableRow key={row.orderNumber}>
                            <TableCell align="center">{row.id}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">${row.sale}</TableCell>
                            <TableCell align="center">{row.deadline}</TableCell>
                            <TableCell align="center">{row.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}