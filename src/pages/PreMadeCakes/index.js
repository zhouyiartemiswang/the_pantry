import React, { useState, useEffect } from 'react';
import PreMadeCakeDialog from '../../components/PreMadeCakeDialog';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Toolbar } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default function PreMadeCakes() {
    const classes = useStyles();
    const [cakeListState, setCakeListState] = useState([]);

    useEffect(() => {
        setCakeListState([
            {
                id: 1,
                image: "http://placekitten.com/100/100",
                name: "Black Forest Cake, 6 in",
                price: "80",
                ingredients: "milk, egg, flour",
                description: "something"
            },
            {
                id: 2,
                image: "http://placekitten.com/100/100",
                name: "Black Forest Cake, 6 in",
                price: "80",
                ingredients: "milk, egg, flour",
                description: "something"
            }
        ])
    }, [])

    const handleItemEdit = event => {

    }

    const handleItemDelete = (event) => {
        // console.log(event.target.id);
        // API.deleteInventory(tokenState, event.target.id)
        //     .then(res => {
        //         console.log("Item deleted!");
        //         window.location.reload();
        //     })
        //     .catch(err => console.log(err));
    };

    return (
        <>
            <Toolbar />
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Price&nbsp;($)</TableCell>
                            <TableCell align="center">Ingredients</TableCell>
                            <TableCell align="center">Description</TableCell>
                            <TableCell align="center">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cakeListState.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell component="th" scope="row">
                                    <img src={row.image} alt={row.name} />
                                </TableCell>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">{row.price}</TableCell>
                                <TableCell align="center">{row.ingredients}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">
                                    <span
                                        className="material-icons"
                                        id={row.id}
                                        onClick={handleItemEdit}
                                    >
                                        edit</span>
                                    <span
                                        className="material-icons"
                                        id={row.id}
                                        onClick={handleItemDelete}
                                    >
                                        delete</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <PreMadeCakeDialog />
        </>
    );
}