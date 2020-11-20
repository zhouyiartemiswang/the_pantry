import React, { useState, useEffect } from 'react';
import { Container, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, Link, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

export default function Shop() {
    const classes = useStyles();
    const [bakeryList, setBakeryList] = useState([]);
    const [cakeState, setCakeState] = useState({
        type: "",
        owner: "",
        size: "",
        name: "",
        base: "",
        filling: "",
        decoration: ""
    });

    const [decorationState, setDecorationState] = useState({
        sugarFlower: false,
        chocolateLettering: false,
    });

    useEffect(() => {
        // API call get list of bakeries
        setBakeryList([
            {
                id: 1,
                name: "Bakery1",
                premadePricing: [
                    {
                        id: 1,
                        name: "Black Forest Cake",
                        price: 80
                    },
                    {
                        id: 2,
                        name: "New York Cheesecake",
                        price: 90
                    }
                ],
                custom: [
                    {
                        id: 1,
                        type: "filling",
                        name: "Chocolate buttercream",
                        price: 15
                    },
                    {
                        id: 2,
                        type: "size",
                        name: "8",
                        price: 80
                    }
                ]
            },
            {
                id: 2,
                name: "Bakery2",
                premadePricing: [
                    {
                        id: 1,
                        name: "Black Forest Cake",
                        price: 80
                    },
                    {
                        id: 2,
                        name: "New York Cheesecake",
                        price: 90
                    }
                ],
                custom: [
                    {
                        id: 1,
                        type: "filling",
                        name: "Chocolate buttercream",
                        price: 15
                    },
                    {
                        id: 2,
                        type: "size",
                        name: "8",
                        price: 80
                    }
                ]
            }
        ])
    }, [])

    const handleCakeChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target;
        setCakeState({
            ...cakeState,
            [name]: value
        });
    };

    const handleDecorationChange = (event) => {
        const { name, checked } = event.target;
        setDecorationState({
            ...decorationState,
            [name]: checked
        });
    };

    const handleButtonClick = (event) => {
        console.log(event.target);

        const orderInfo = {
            sales: 100,
            ingredients: "milk, egg, sugar, flour",
            deadline: "2020-11-20",
            status: "pending",
            description: cakeState.type,
            baker_id: cakeState.owner

        }
        const token = localStorage.getItem("token");
        API.createOrder(token, orderInfo)
            .then(res => console.log("Order placed!"))
            .catch(err => console.log(err));

    }

    const { sugarFlower, chocolateLettering } = decorationState;

    return (
        <>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
                <form onSubmit={handleButtonClick}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={9}>
                            <FormControl required className={classes.formControl}>
                                <InputLabel id="owner-label">Select your cake master</InputLabel>
                                <Select
                                    labelId="owner-label"
                                    id="owner"
                                    onChange={handleCakeChange}
                                    value={cakeState.owner}
                                    name="owner"
                                >
                                    {bakeryList.map(bakery =>
                                        <MenuItem value={bakery.id}>{bakery.name}</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                        </Grid>
                        {cakeState.owner ?
                            <>
                                {/* Select Cake Type */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <FormControl required className={classes.formControl}>
                                        <InputLabel id="type-label">Type of cake</InputLabel>
                                        <Select
                                            labelId="type-label"
                                            id="type"
                                            onChange={handleCakeChange}
                                            value={cakeState.type}
                                            name="type"
                                        >
                                            <MenuItem value="preMade">Pre-Made</MenuItem>
                                            <MenuItem value="custom">Custom</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {cakeState.type ?
                                    <>
                                        {
                                            cakeState.type === "preMade" ?
                                                (<Grid item xs={12} md={8} lg={9}>
                                                    <FormControl required className={classes.formControl}>
                                                        <InputLabel id="preMadeCake-label">Pre-Made Cake</InputLabel>
                                                        <Select
                                                            labelId="preMadeCake-label"
                                                            id="preMadeCake"
                                                            onChange={handleCakeChange}
                                                            value={cakeState.name}
                                                            name="name"
                                                        >
                                                            <MenuItem value="strawberryMousse">Strawberry Mousse Cake</MenuItem>
                                                            <MenuItem value="blackForest">Black Forest Cake</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>)
                                                :
                                                (
                                                    <>
                                                        {/* Size Selection */}
                                                        <Grid item xs={12} md={8} lg={9}>
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel id="size-label">Size of cake</InputLabel>
                                                                <Select
                                                                    labelId="size-label"
                                                                    id="size"
                                                                    onChange={handleCakeChange}
                                                                    value={cakeState.size}
                                                                    name="size"
                                                                >
                                                                    <MenuItem value={6}>6 inch</MenuItem>
                                                                    <MenuItem value={8}>8 inch</MenuItem>
                                                                    <MenuItem value={10}>10 inch</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        {/* Base Selections */}
                                                        <Grid item xs={12} md={8} lg={9}>
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel id="base-label">Pick a cake base</InputLabel>
                                                                <Select
                                                                    labelId="base-label"
                                                                    id="base"
                                                                    onChange={handleCakeChange}
                                                                    value={cakeState.base}
                                                                    name="base"
                                                                >
                                                                    <MenuItem value="chocolateBase">Chocolate Cake</MenuItem>
                                                                    <MenuItem value="vanillaBase">Vanilla Cake</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        {/* Filling Selections */}
                                                        <Grid item xs={12} md={8} lg={9}>
                                                            <FormControl required className={classes.formControl}>
                                                                <InputLabel id="filling-label">Pick a filling</InputLabel>
                                                                <Select
                                                                    labelId="filling-label"
                                                                    id="filling"
                                                                    onChange={handleCakeChange}
                                                                    value={cakeState.filling}
                                                                    name="filling"
                                                                >
                                                                    <MenuItem value="chocolateButtercream">Chocolate Buttercream</MenuItem>
                                                                    <MenuItem value="vanillaButtercream">Vanilla Buttercream</MenuItem>
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        {/* Decoration Checkboxes */}
                                                        <Grid item xs={12} md={8} lg={9}>
                                                            <FormControl component="fieldset" className={classes.formControl}>
                                                                <FormLabel component="legend">Pick decorations</FormLabel>
                                                                <FormGroup>
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={sugarFlower}
                                                                                onChange={handleDecorationChange}
                                                                                name="sugarFlower" />}
                                                                        label="Sugar Flower"
                                                                    />
                                                                    <FormControlLabel
                                                                        control={
                                                                            <Checkbox
                                                                                checked={chocolateLettering}
                                                                                onChange={handleDecorationChange}
                                                                                name="chocolateLettering" />}
                                                                        label="Chocolate Lettering"
                                                                    />
                                                                </FormGroup>
                                                            </FormControl>
                                                        </Grid>
                                                    </>
                                                )
                                        }
                                    </> : null
                                }
                                <Grid item xs={12} md={8} lg={9}>
                                    <Button
                                        // onSubmit={handleButtonClick}
                                        name="addToCartBtn"
                                        variant="outlined"
                                        color="primary"
                                    >
                                        Add to Cart
                                    </Button>
                                    <Link href="/">
                                        <Button

                                            name="cancelBtn"
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Cancel
                                        </Button>
                                    </Link>
                                </Grid>
                            </> : null
                        }
                    </Grid>
                </form>
            </Container>
        </>
    )
}
