import React, { useState, useEffect } from 'react';
import CakeMasterCard from '../../components/CakeMasterCard';
import { Container, TextField, Grid, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './style.css';

const useStyles = makeStyles((theme) => ({
    appBarSpacer: theme.mixins.toolbar,
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export default function CakeMasters(props) {
    const classes = useStyles();
    const [cakeList, setCakeList] = useState([]);
    const [inputValue, setInputValue] = useState(""); // input displayed/entered in the search box 

    useEffect(() => {
        setCakeList([
            {
                id: "1",
                name: "Black Forest Cake",
                price: "50",
                description: "6 in, something",
                img: "http://placekitten.com/200/100",
                bakeryName: "Bakery1",
                bakeryAddress: "Bakery 1 address",
                bakeryPhone: "(123) 456-7890"
            },
            {
                id: 2,
                name: "Chocolate Mousse Cake",
                price: "70",
                description: "6 in, something chocolate",
                img: "http://placekitten.com/200/100",
                bakeryName: "Bakery2",
                bakeryAddress: "Bakery 2 address",
                bakeryPhone: "(111) 111-1111"
            }
        ]);
    }, [])

    const handleInputChange = event => {
        console.log(event.target);
        console.log(inputValue);
        const bakeryName = inputValue.split(",")[0];
        console.log(bakeryName);
        // Call API to get all cakes from bakeryName
        // Then setCakeList = new list
    }

    return (
        <Container className={classes.container}>
            <div className={classes.appBarSpacer} />

            <Autocomplete
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={handleInputChange}
                id="search-box"
                options={cakeList}
                getOptionLabel={(option) => {
                    return `${option.bakeryName}, ${option.bakeryAddress}`
                }}
                style={{ width: 500 }}
                renderInput={(params) => <TextField {...params} label="Search a bakery" variant="outlined" />}
            />

            <Grid container spacing={3}>
                {cakeList.map(cake =>
                    <Grid item xs={12} md={4} lg={4}>
                        <CakeMasterCard key={cake.id} cake={cake} />
                    </Grid>
                )}
            </Grid>

        </Container>
    )
}
