import React, { useState } from 'react';
import { Container, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "70%",
        marginTop: 100,
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 300,
    },
}));

export default function Shop() {
    const classes = useStyles();

    const [cakeState, setCakeState] = useState({
        type: "",
        owner: "",
        size: 0,
        name: "",
        base: "",
        filling: "",
        decoration: ""
    });

    const [decorationState, setDecorationState] = useState({
        sugarFlower: false,
        chocolateLettering: false,
    });

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

    const { sugarFlower, chocolateLettering } = decorationState;

    return (
        <Container className={classes.root}>
            <FormControl required className={classes.formControl}>
                <InputLabel id="owner-label">Select your cake master</InputLabel>
                <Select
                    labelId="owner-label"
                    id="owner"
                    onChange={handleCakeChange}
                    value={cakeState.owner}
                    name="owner"
                >
                    <MenuItem value="Bakery1">Bakery1</MenuItem>
                    <MenuItem value="Bakery2">Bakery2</MenuItem>
                    <MenuItem value="Bakery3">Bakery3</MenuItem>
                </Select>
            </FormControl>
            {cakeState.owner ?
                <>
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
                    {cakeState.type ?
                        <>
                            {
                                cakeState.type === "preMade" ?
                                    (<FormControl required className={classes.formControl}>
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
                                    </FormControl>)
                                    :
                                    (
                                        <>
                                            {/* Base Selections */}
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

                                            {/* Filling Selections */}
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

                                            {/* Decoration Checkboxes */}
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
                                        </>
                                    )
                            }
                        </> : null
                    }
                    <Button variant="outlined" color="primary">
                        Add to Cart
                    </Button>
                    <Button variant="outlined" color="primary">
                        Cancel
                    </Button>
                </> : null
            }
        </Container>
    )
}
