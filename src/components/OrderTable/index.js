import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, FormControl, Select, MenuItem, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    table: {
        // width: "100%",
        // [theme.breakpoints.up('sm')]: {
        //     marginLeft: 0,
        // }
    },
}));

export default function OrderTable(props) {
    const classes = useStyles();

    function handleItemEdit(data) {
        props.setEditButtonState({
            ...props.editButtonState,
            id: data.id,
            status: data.status,
            clicked: true
        });
    }

    function handleItemSave(data) {
        props.setEditButtonState({
            ...props.editButtonState,
            clicked: false
        });
        const info ={
            sale: data.sale,
            ingredients: data.ingredients,
            deadline: data.deadline,
            status: props.editButtonState.status,
            description: data.description
        }
        props.editOne("order", data.id, info);
    }

    const handleStatusChange = event => {
        props.setEditButtonState({
            ...props.editButtonState,
            status: event.target.value
        });
    }

    const handleItemDelete = event => {
        props.deleteOne("order", event.target.id);
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
                                {props.editButtonState.clicked && parseInt(props.editButtonState.id) === row.id ?
                                    <>
                                        <FormControl className={classes.formControl}>

                                            <Select
                                                labelId="status-label"
                                                id="status"
                                                value={props.editButtonState.status}
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
                                    {props.editButtonState.clicked && parseInt(props.editButtonState.id) === row.id ?
                                        <span
                                            id={row.id}
                                            className="material-icons"
                                            onClick={function () {handleItemSave(row)}}
                                        >
                                            save
                                                </span>
                                        :
                                        <span
                                            id={row.id}
                                            className="material-icons"
                                            onClick={function () {handleItemEdit(row)}}
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
