import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import API from '../../utils/API';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(orderNumber, type, sale, deadline, status) {
    return { orderNumber, type, sale, deadline, status };
}

const rows = [
    createData("000001", "pre-made", 100, "December 4, 2020", "in progress" ),
    createData("000002", "pre-made", 90, "December 2, 2020", "in progress"),
    createData("000003", "custom", 200, "December 14, 2020", "in progress"),
    createData("000004", "pre-made", 45, "December 3, 2020", "in progress"),
    createData("000005", "custom", 300, "December 11, 2020", "in progress"),
];

export default function BasicTable() {
    const classes = useStyles();
    const [orderState, setOrderState] = useState([]);

    // useEffect(() => {
    //     API.getOrders().then(res => setOrderState(res))
    // }, [])

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Order Number</TableCell>
                        <TableCell align="center">Type of Cake</TableCell>
                        <TableCell align="center">Sale</TableCell>
                        <TableCell align="center">Deadline</TableCell>
                        <TableCell align="center">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.orderNumber}>
                            <TableCell align="center">{row.orderNumber}</TableCell>
                            <TableCell align="center">{row.type}</TableCell>
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