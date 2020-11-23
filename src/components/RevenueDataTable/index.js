import React from 'react';
import RevenueDialog from '../../components/RevenueDialog';
import { Typography, Table, TableHead, TableRow, TableCell, TableBody, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles(() => ({
    table: {
        // minWidth: 650,
    },
    title: {
        marginLeft: 10,
        marginTop: 10,
    },
}));

export default function RevenueDataTable(props) {
    const classes = useStyles();

    function handleItemDelete(event) {

    };

    return (
        <div>
            <Typography className={classes.title} component="h2" variant="h6" color="primary" gutterBottom>
                Data Entries
            </Typography>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Month</TableCell>
                        <TableCell align="center">Sale ($)</TableCell>
                        <TableCell align="center">Cost ($)</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">{row.year}</TableCell>
                            <TableCell align="center">{row.month}</TableCell>
                            <TableCell align="center">{row.sales}</TableCell>
                            <TableCell align="center">{row.ingredients}</TableCell>
                            <TableCell align="center">{row.description}</TableCell>
                            <TableCell align="center">
                                <RevenueDialog/>
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
        </div>
    )
}
