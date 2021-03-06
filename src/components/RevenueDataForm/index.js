import React, { useState } from 'react';
import { Typography, FormControl, InputLabel, Select, MenuItem, TextField, InputAdornment, Button, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    title: {
        marginTop: 10,
    },
}));

export default function RevenueDataForm(props) {
    const classes = useStyles();

    const [chartData, setChartData] = useState({
        year: "",
        month: "",
        sales: "",
        ingredients: "",
        description: ""
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChartData({ ...chartData, [name]: value })
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        const data = {month: `${chartData.month} ${chartData.year}`, ingredients: chartData.ingredients, description: chartData.description, sales: chartData.sales};
        props.addOne("revenue", data);
        setChartData({
            year: "",
            month: "",
            sales: "",
            ingredients: "",
            description: ""
        });
    };

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleFormSubmit}>

            <Typography className={classes.title} component="h2" variant="h6" color="default" gutterBottom>
                Enter Monthly Data
                    </Typography>

            <FormControl required variant="outlined" className={classes.formControl} size="small">
                <TextField
                    required
                    id="year"
                    type="number"
                    label="Year (YYYY)"
                    onInput={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 4)
                    }}
                    name="year"
                    value={chartData.year}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small" />
                </FormControl>

            <FormControl required variant="outlined" className={classes.formControl} size="small">
                <InputLabel id="month-label">Month</InputLabel>
                <Select
                    labelId="month-label"
                    id="month"
                    name="month"
                    value={chartData.month}
                    onChange={handleInputChange}
                    label="Month"
                >
                    {monthList.map((month => <MenuItem value={month}>{month}</MenuItem>))}

                </Select>
            </FormControl>

            <TextField
                required
                id="sales"
                type="number"
                label="Sales"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                name="sales"
                value={chartData.sales}
                onChange={handleInputChange}
                variant="outlined"
                size="small" />

            <TextField
                required
                id="cost"
                type="number"
                label="Cost"
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                name="ingredients"
                value={chartData.ingredients}
                onChange={handleInputChange}
                variant="outlined"
                size="small" />

            <TextField
                multiline={true}
                id="description"
                label="Description"
                name="description"
                value={chartData.description}
                onChange={handleInputChange}
                variant="outlined"
                size="small" />

            <Button onClick={handleFormSubmit} variant="outlined" color="default">
                Add
            </Button>

        </form>
    )
}
