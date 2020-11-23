import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Paper, Container, Grid, FormControl, InputLabel, Select, MenuItem, FormLabel, FormGroup, FormControlLabel, Checkbox, Button, Link, makeStyles } from '@material-ui/core';
import API from '../../utils/API'
import './style.css';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        width: 700,

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 370,
    },
}));

export default function Shop(props) {
    const classes = useStyles();
    let history = useHistory();
    const [bakeryList, setBakeryList] = useState([]);
    const [preMadeList, setPreMadeList] = useState([]);
    const [sizeList, setSizeList] = useState([]);
    const [baseList, setBaseList] = useState([]);
    const [fillingList, setFillingList] = useState([]);
    // const [decorationList, setDecorationList] = useState([]);
    const [decorationList, setDecorationList] = useState([]);
    const [decorationState, setDecorationState] = useState([]);
    const [errorState, setErrorState] = useState({
        message: ""
    });

    const [cakeState, setCakeState] = useState({
        type: "",
        owner: "",
        size: "",
        name: "",
        base: "",
        filling: ""
    });

    useEffect(function () {
        if (!props.profile.isLoggedIn) {
            setErrorState({ message: "Log in to place an order." });
        }
        if (props.profile.isLoggedIn) {
            setErrorState({ message: "" });
        }
        let bakerArray = [];
        let premadeArray = [];
        let sizeArray = [];
        let baseArray = [];
        let fillingArray = [];
        let decorationArray = [];
        let stateArray = [];
        if (props.bakers.allBakers) {
            for (let i = 0; i < props.bakers.allBakers.length; i++) {
                bakerArray.push(props.bakers.allBakers[i]);
            }
        }
        if (props.cakes.allCakes) {
            for (let i = 0; i < props.cakes.allCakes.length; i++) {
                premadeArray.push(props.cakes.allCakes[i]);
            }
        }
        if (props.custom.allCustom) {
            for (let i = 0; i < props.custom.allCustom.length; i++) {
                if (props.custom.allCustom[i].type === "Size") {
                    sizeArray.push(props.custom.allCustom[i]);
                }
                if (props.custom.allCustom[i].type === "Base") {
                    baseArray.push(props.custom.allCustom[i]);
                }
                if (props.custom.allCustom[i].type === "Filling") {
                    fillingArray.push(props.custom.allCustom[i]);
                }
                if (props.custom.allCustom[i].type === "Decoration") {
                    decorationArray.push(props.custom.allCustom[i]);
                }
            }
        }
        if (decorationArray.length > 0) {
            for (let i = 0; i < decorationArray.length; i++) {
                stateArray.push({ id: decorationArray[i].id, name: decorationArray[i].name, value: false, baker: decorationArray[i].baker_id, price: decorationArray[i].price });
            }
        }

        setBakeryList({ all: bakerArray, filtered: bakerArray });
        setPreMadeList({ all: premadeArray, filtered: premadeArray });
        setSizeList({ all: sizeArray, filtered: sizeArray });
        setBaseList({ all: baseArray, filtered: baseArray });
        setFillingList({ all: fillingArray, filtered: fillingArray });
        setDecorationList({ all: decorationArray, filtered: decorationArray });
        setDecorationState({ all: stateArray, filtered: stateArray });


    }, [props.bakers, props.custom, props.cakes]);

    const handleCakeChange = (event) => {
        // console.log(event.target);
        const { name, value } = event.target;
        if (name === "owner") {
            setCakeState({
                owner: value,
                type: "",
                size: "",
                name: "",
                base: "",
                filling: ""
            });
        }
        else if (name === "type") {
            if (value === "preMade") {
                setCakeState({
                    owner: cakeState.owner,
                    type: value,
                    size: "",
                    name: "",
                    base: "",
                    filling: ""
                });
            }
            else {
                setCakeState({
                    owner: cakeState.owner,
                    type: value,
                    size: cakeState.size,
                    name: "",
                    base: cakeState.base,
                    filling: cakeState.filling
                });
            }
        }
        else {
            setCakeState({
                ...cakeState,
                [name]: value
            });
        }
        if (name === "owner") {
            filterLists(value);
        }
    };

    function filterLists(id) {
        console.log(id);
        let premadeArray = [];
        let sizeArray = [];
        let baseArray = [];
        let fillingArray = [];
        let decorationArray = [];
        let stateArray = [];
        for (let i = 0; i < preMadeList.all.length; i++) {
            if (preMadeList.all[i].baker_id === id) {
                premadeArray.push(preMadeList.all[i]);
            }
        }
        for (let i = 0; i < sizeList.all.length; i++) {
            if (sizeList.all[i].baker_id === id) {
                sizeArray.push(sizeList.all[i]);
            }
        }
        for (let i = 0; i < baseList.all.length; i++) {
            if (baseList.all[i].baker_id === id) {
                baseArray.push(baseList.all[i]);
            }
        }
        for (let i = 0; i < fillingList.all.length; i++) {
            if (fillingList.all[i].baker_id === id) {
                fillingArray.push(fillingList.all[i]);
            }
        }
        for (let i = 0; i < decorationList.all.length; i++) {
            if (decorationList.all[i].baker_id === id) {
                decorationArray.push(decorationList.all[i]);
            }
        }
        for (let i = 0; i < decorationState.all.length; i++) {
            decorationState.all[i].value = false;
            if (decorationState.all[i].baker === id) {
                stateArray.push(decorationState.all[i]);
            }
        }

        setPreMadeList({ ...preMadeList, filtered: premadeArray });
        setSizeList({ ...sizeList, filtered: sizeArray });
        setBaseList({ ...baseList, filtered: baseArray });
        setFillingList({ ...fillingList, filtered: fillingArray });
        setDecorationList({ ...decorationList, filtered: decorationArray });
        setDecorationState({ ...decorationState, filtered: stateArray });
    }

    const handleDecorationChange = (event) => {
        const { name, checked } = event.target;
        // console.log(name, checked);

        let newArray = [];
        for (let i = 0; i < decorationState.filtered.length; i++) {
            if (decorationState.filtered[i].name === name) {
                decorationState.filtered[i].value = checked;
            }
            newArray.push(decorationState.filtered[i]);
        }
        // console.log(newArray);
        setDecorationState({ ...decorationState, filtered: newArray });
    }

    function getDeadline(change) {
        let newDate = new Date();
        let year = newDate.getFullYear();
        let month = newDate.getMonth();
        let day = newDate.getDate();
        month = month + 1;
        day = day + change;
        let changed = false;
        do {
            if (day > 28) {
                if (month === 2) {
                    day = day - 28;
                    month = month + 1;
                    changed = true;
                }
                else if ((month === 1) || (month === 3) || (month === 5) || (month === 7) || (month === 8) || (month === 10) || (month === 12)) {
                    if (day > 31) {
                        day = day - 31;
                        month = month + 1;
                        changed = true;
                        if (month === 13) {
                            month = 1;
                            year = year + 1;
                        }
                    }
                    else {
                        changed = false;
                    }
                }
                else {
                    if (day > 30) {
                        day = day - 30;
                        month = month + 1;
                        changed = true;
                    }
                    else {
                        changed = false;
                    }
                }
            }
            else {
                changed = false;
            }
        } while (changed);
        return (`${year}-${month}-${day}`);
    }

    function submitOrder(data) {
        if (!props.profile.isLoggedIn) {
            setErrorState({ message: "Log in to place an order." });
        }
        else {
            const token = localStorage.getItem("token");
            API.createOrder(token, data).then(function (res) {
                if (res) {
                    setErrorState({ message: "" });
                    props.fillProfile();
                    return history.push("/");
                }
                else {
                    setErrorState({ message: "something went wrong" });
                }
            });
        }
    }

    const handleButtonClick = (event) => {
        event.preventDefault();
        let orderObj = {};
        //console.log(moment());
        let newDate = getDeadline(7);
        // newDate = newDate.getDate();
        if (cakeState.name) {
            for (let i = 0; i < preMadeList.filtered.length; i++) {
                if (preMadeList.filtered[i].id === cakeState.name) {
                    orderObj = { sale: preMadeList.filtered[i].price, ingredients: preMadeList.filtered[i].ingredients, status: "Pending", description: `${preMadeList.filtered[i].name} : ${preMadeList.filtered[i].description}`, baker_id: preMadeList.filtered[i].baker_id, deadline: newDate };
                }
            }
        }
        else {
            let totalCalc = 0;
            let ingredientsCalc = "";
            let descriptionCalc = "";
            for (let i = 0; i < sizeList.filtered.length; i++) {
                if (sizeList.filtered[i].id === cakeState.size) {
                    totalCalc = totalCalc + parseFloat(sizeList.filtered[i].price);
                    ingredientsCalc = `${sizeList.filtered[i].name}`;
                    descriptionCalc = `${sizeList.filtered[i].name}`;
                }
            }
            for (let i = 0; i < baseList.filtered.length; i++) {
                if (baseList.filtered[i].id === cakeState.base) {
                    totalCalc = totalCalc + parseFloat(baseList.filtered[i].price);
                    ingredientsCalc = `${ingredientsCalc}, ${baseList.filtered[i].name}`;
                    descriptionCalc = `${descriptionCalc}, ${baseList.filtered[i].name} base`;
                }
            }
            for (let i = 0; i < fillingList.filtered.length; i++) {
                if (fillingList.filtered[i].id === cakeState.filling) {
                    totalCalc = totalCalc + parseFloat(fillingList.filtered[i].price);
                    ingredientsCalc = `${ingredientsCalc}, ${fillingList.filtered[i].name}`;
                    descriptionCalc = `${descriptionCalc}, ${fillingList.filtered[i].name} filling`;
                }
            }
            for (let i = 0; i < decorationState.filtered.length; i++) {
                if (decorationState.filtered[i].value === true) {
                    totalCalc = totalCalc + parseFloat(decorationState.filtered[i].price);
                    ingredientsCalc = `${ingredientsCalc}, ${decorationState.filtered[i].name}`;
                    descriptionCalc = `${descriptionCalc}, ${decorationState.filtered[i].name} decoration`;
                }
            }
            console.log(totalCalc, descriptionCalc);
            orderObj = { sale: totalCalc, ingredients: ingredientsCalc, status: "Pending", description: descriptionCalc, baker_id: cakeState.owner, deadline: newDate };
        }

        submitOrder(orderObj);
    }

    return (
        <>
            <div className="shop-cover-img">
                <div className={classes.appBarSpacer} />
                <div className="title-container">
                    <h1>SHOP</h1>
                    <p>
                        Select a bakery and order pre-made and custom cakes of your choice.
                    </p>
                    {errorState.message
                        ? <p>{errorState.message}</p>
                        : null
                    }
                </div>
            </div>
            <Container maxWidth="lg" className={classes.container}>
                <Paper>
                    <form className="form-container" onSubmit={handleButtonClick}>

                        <Grid container spacing={3} justify="center">
                            <Grid item xs={12} md={8} lg={9}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel id="owner-label">Select your cake master</InputLabel>
                                    <Select
                                        labelId="owner-label"
                                        id="owner"
                                        className="form-text"
                                        onChange={handleCakeChange}
                                        value={cakeState.owner}
                                        name="owner"
                                    >
                                        {bakeryList.all
                                            ? bakeryList.all.map(bakery => <MenuItem value={bakery.id}>{bakery.username} : {bakery.address}</MenuItem>)
                                            : <MenuItem value={0}>None</MenuItem>
                                        }
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
                                                className="form-text"
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
                                                            className="form-text"
                                                            onChange={handleCakeChange}
                                                            value={cakeState.name}
                                                            name="name"
                                                        >
                                                            {preMadeList.filtered.length === 0
                                                                ? <MenuItem value="none">None</MenuItem>
                                                                : preMadeList.filtered.map(cake =>
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
                                                                    className="form-text"
                                                                    onChange={handleCakeChange}
                                                                    value={cakeState.size}
                                                                    name="size"
                                                                >
                                                                    {sizeList.filtered.length === 0
                                                                        ? <MenuItem value="none">None</MenuItem>
                                                                        : sizeList.filtered.map(size =>
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
                                                                    className="form-text"
                                                                    onChange={handleCakeChange}
                                                                    value={cakeState.base}
                                                                    name="base"
                                                                >
                                                                    {baseList.filtered.length === 0
                                                                        ? <MenuItem value="none">None</MenuItem>
                                                                        : baseList.filtered.map(base =>
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
                                                                    className="form-text"
                                                                    onChange={handleCakeChange}
                                                                    value={cakeState.filling}
                                                                    name="filling"
                                                                >
                                                                    {fillingList.filtered.length === 0
                                                                        ? <MenuItem value="none">None</MenuItem>
                                                                        : fillingList.filtered.map(filling =>
                                                                            <MenuItem value={filling.id}>{filling.name}</MenuItem>
                                                                        )
                                                                    }
                                                                </Select>
                                                            </FormControl>
                                                        </Grid>

                                                        {/* Decoration Checkboxes */}
                                                        <Grid item xs={12} md={8} lg={9}>
                                                            <FormControl component="fieldset" className={classes.formControl}>
                                                                <FormLabel
                                                                    component="legend"
                                                                    className="form-text"
                                                                >
                                                                    Pick decorations
                                                                </FormLabel>
                                                                <FormGroup>
                                                                    {decorationList.filtered.length === 0
                                                                        ? <FormControlLabel
                                                                            value="disabled"
                                                                            control={
                                                                                <Checkbox
                                                                                    checked
                                                                                    name="none"
                                                                                    color="default" />
                                                                            }
                                                                            label="None"
                                                                        />
                                                                        :
                                                                        <>
                                                                            {decorationState.filtered.length > 0 ?
                                                                                decorationState.filtered.map(decoration =>
                                                                                    <FormControlLabel
                                                                                        control={
                                                                                            <Checkbox
                                                                                                checked={decoration.value}
                                                                                                onChange={handleDecorationChange}
                                                                                                name={decoration.name}
                                                                                                color="default" />}
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
                                            className="shop-btn"
                                            type="submit"
                                            name="addToCartBtn"
                                            variant="outlined"
                                            color="primary"
                                        >
                                            Order
                                        </Button>
                                        <Link href="/">
                                            <Button
                                                className="shop-btn"
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
                </Paper>
            </Container>
        </>
    )
}
