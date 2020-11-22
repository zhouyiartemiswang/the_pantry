import React, { useState, useEffect } from 'react';
import SideNav from '../../components/SideNav';
import ConfirmationSnackBar from '../../components/ConfirmationSnackBar';
import PreMadeCakeDialog from '../../components/PreMadeCakeDialog';
import CustomCakeDialog from '../../components/CustomCakeDialog';
import { Toolbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
    },
    appBarSpacer: theme.mixins.toolbar,
}));

export default function CakePricing(props) {
    const classes = useStyles();
    const [cakeListState, setCakeListState] = useState([]);

    useEffect(() => {
        props.isPreMade ?
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
            :
            setCakeListState([
                {
                    id: 1,
                    type: "filling",
                    name: "vanilla buttercream",
                    price: "10"
                },
                {
                    id: 2,
                    type: "filling",
                    name: "strawberry buttercream",
                    price: "8"
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

    const headList = props.isPreMade
        ? ["Image", "Name", "Price ($)", "Ingredients", "Description", "Action"]
        : ["Type", "Name", "Price ($)", "Action"];

    return (
        <>
            <div className={classes.appBarSpacer} />
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                    <TableContainer component={Paper}>
                        <Table className={classes.table}>
                            {/* <colgroup>
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                        <col style={{ width: '20%' }} />
                    </colgroup> */}
                            <TableHead>
                                <TableRow>
                                    {headList.map(head =>
                                        <TableCell align="center">{head}</TableCell>
                                    )}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cakeListState.map((row) => (
                                    <TableRow key={row.id}>
                                        {props.isPreMade ?
                                            <>
                                                <TableCell component="th" scope="row">
                                                    <img src={row.image} alt={row.name} />
                                                </TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                                <TableCell align="center">{row.ingredients}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                            </>
                                            :
                                            <>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{row.name}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                            </>
                                        }
                                        <TableCell align="center">
                                            <span
                                                className="material-icons"
                                                id={row.id}
                                                onClick={handleItemEdit}
                                            >
                                                edit</span>
                                            <ConfirmationSnackBar id={row.id} name={row.name} handleItemDelete={handleItemDelete} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            {props.isPreMade
                                ? <PreMadeCakeDialog />
                                : <CustomCakeDialog />
                            }
                        </Table>
                    </TableContainer>
                </>
                :
                <div>
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
                </div>
            }

        </>
    );
}