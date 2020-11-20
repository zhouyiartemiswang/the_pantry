import React, { useState, useEffect } from 'react';
import SideNav from '../../components/SideNav';
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

    // form for the custom should not have a "size" field. That should be part of the "type" field.
    // form for the custom should have a dropdown for the "type" field
    // form for the premade should not have a "size" field. That should be included with the description.
    // form for the premade, upload image button has no functionality. 
    //     if you want to give the user freedom to add an img file, that would require a technology like cloudinary to host the img.
    //     database is expecting a string (an img url), that can then be used as the "src" attribute for the img tag
    // form for the premade, the "description" field should be a text box that changes in size so you can see everything you typed.
    // form for the premade, the "ingredients" field should be a text box that changes in size so you can see everything you typed.
    // you shouldn't be allowed to access the prices page if you aren't logged in
    return (
        <>
            <Toolbar />
            <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} isLoggedIn={props.isLoggedIn} isOwner={props.isOwner} />
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
                    {props.isPreMade
                        ? <PreMadeCakeDialog />
                        : <CustomCakeDialog />
                    }
                </Table>
            </TableContainer>
        </>
    );
}