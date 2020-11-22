import React, { useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, FormControl, Select, MenuItem, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
    },
}));

export default function OrderTable(props) {
    const classes = useStyles();

    const [editButtonState, setEditButtonState] = useState({
        id: "",
        status: "",
        clicked: false
    });

    const handleItemEdit = event => {
        // console.log(event.target.id)
        setEditButtonState({
            ...editButtonState,
            id: event.target.id,
            clicked: true
        });
        console.log(editButtonState);
    }

    const handleStatusChange = event => {
        setEditButtonState({
            ...editButtonState,
            status: event.target.value
        });
    }

    const handleItemDelete = event => {
        // console.log(event.target.id)
        // Delete order
    }

    return (
        <div>
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
                {!props.orders
                    ? <h4 style={{ textAlign: "center" }}>No orders.</h4>
                    : props.orders.length === 0
                    ? <h4 style={{ textAlign: "center" }}>No orders.</h4>
                    :
                    <TableBody>
                        {props.orders.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.id}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.sale}</TableCell>
                                <TableCell align="center">{row.deadline}</TableCell>
                                {editButtonState.clicked && editButtonState.id === row.id ?
                                    <>
                                        <FormControl className={classes.formControl}>

                                            <Select
                                                labelId="status-label"
                                                id="status"
                                                value={editButtonState.status}
                                                onChange={handleStatusChange}
                                            >
                                                <MenuItem value="Pending">Pending</MenuItem>
                                                <MenuItem value="In Progress">In Progress</MenuItem>
                                                <MenuItem value="Completed">Completed</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </>
                                    : <TableCell align="center">{row.status}</TableCell>
                                }
                                <TableCell align="center">
                                    {editButtonState.clicked && editButtonState.id === row.id ?
                                        <span
                                            id={row.id}
                                            className="material-icons"
                                            onClick={props.handleItemSave}
                                        >
                                            save
                                                </span>
                                        :
                                        <span
                                            id={row.id}
                                            className="material-icons"
                                            onClick={handleItemEdit}
                                        >
                                            edit
                                                </span>
                                    }
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
                }
            </Table>
        </div>
    )
}
