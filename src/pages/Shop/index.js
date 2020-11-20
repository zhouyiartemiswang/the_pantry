import React, { useState, useEffect } from 'react';
import { Container, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, Link, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
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
    const [premadeList, setPremadeList] = useState([]);
    const [customList, setCustomList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [baseList, setBaseList] = useState([]);
    const [fillingList, setFillingList] = useState([]);
    // const [decorationList, setDecorationList] = useState([]);
    const [decorationList, setDecorationList] = useState(["Sugar flower", "Chocolate lettering"]);
    const [decorationState, setDecorationState] = useState([]);

    const [cakeState, setCakeState] = useState({
        type: "",
        owner: "",
        size: "",
        name: "",
        base: "",
        filling: "",
        decoration: ""
    });


    useEffect(() => {
        // API call get list of bakeries
        setBakeryList([
            {
                id: 1,
                name: "Bakery1",
                premade: [
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
                premade: [
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

        if (decorationList.length > 0) {
            const decorationArray = decorationList.map(decoration => (
                {
                    name: decoration,
                    value: false
                }
            ));
            console.log(decorationArray);
            setDecorationState(decorationArray);
            console.log(decorationState);
        }

    }, [decorationList])

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
        // console.log(name, checked);

        let newArray = decorationState.map(decoration => {
            if (decoration.name === name) {
                decoration.value = checked;
            }
            return decoration;
        })
        // console.log(newArray);
        setDecorationState(newArray);
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
                                        {cakeState.type === "preMade" ?
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
                                                        {premadeList.length === 0
                                                            ? <MenuItem value="none">None</MenuItem>
                                                            : premadeList.map(cake =>
                                                                <MenuItem value={cake.id}>{cake.name}</MenuItem>
                                                            )
                                                        }
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
                                                                {sizeList.length === 0
                                                                    ? <MenuItem value="none">None</MenuItem>
                                                                    : sizeList.map(size =>
                                                                        <MenuItem value={size.id}>{size.name}</MenuItem>
                                                                    )
                                                                }
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
                                                                {baseList.length === 0
                                                                    ? <MenuItem value="none">None</MenuItem>
                                                                    : baseList.map(base =>
                                                                        <MenuItem value={base.id}>{base.name}</MenuItem>
                                                                    )
                                                                }
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
                                                                {fillingList.length === 0
                                                                    ? <MenuItem value="none">None</MenuItem>
                                                                    : fillingList.map(filling =>
                                                                        <MenuItem value={filling.id}>{filling.name}</MenuItem>
                                                                    )
                                                                }
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>

                                                    {/* Decoration Checkboxes */}
                                                    <Grid item xs={12} md={8} lg={9}>
                                                        <FormControl component="fieldset" className={classes.formControl}>
                                                            <FormLabel component="legend">Pick decorations</FormLabel>
                                                            <FormGroup>
                                                                {decorationList.length === 0
                                                                    ? <FormControlLabel
                                                                        value="disabled"
                                                                        control={
                                                                            <Checkbox
                                                                                checked
                                                                                name="none" />}
                                                                        label="None"
                                                                    />
                                                                    :
                                                                    <>
                                                                        {decorationState.length > 0 ?
                                                                            decorationState.map(decoration =>
                                                                                <FormControlLabel
                                                                                    control={
                                                                                        <Checkbox
                                                                                            checked={decoration.value}
                                                                                            onChange={handleDecorationChange}
                                                                                            name={decoration.name} />}
                                                                                    label={decoration.name}
                                                                                />
                                                                            )
                                                                            : null}
                                                                    </>
                                                                }

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
