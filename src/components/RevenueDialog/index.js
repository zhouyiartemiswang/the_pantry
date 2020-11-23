import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, DialogActions, makeStyles, InputLabel, Select, MenuItem } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        // minWidth: 120,
    },
}));

export default function PreMadeCakeDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [dataState, setDataState] = useState({
        year: "",
        month: "",
        sales: "",
        ingredients: "",
        description: "",
    });

    const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    useEffect( function() {
        if(props.data){
            setDataState({ ...dataState, month: props.data.month.split(" ")[0], year: props.data.month.split(" ")[1], ingredients: props.data.ingredients, description: props.data.description, sales: props.data.sales });
        }
    }, [props.data]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setDataState({
            ...dataState,
            [name]: value
        });
    };

    function handleInputSubmit(event) {
        event.preventDefault();
        handleClose();
        const data = {month: `${dataState.month} ${dataState.year}`, ingredients: dataState.ingredients, description: dataState.description, sales: dataState.sales};
        props.editOne("revenue", props.data.id, data);
    }

    return (
        <div>
            <span className="material-icons" onClick={handleOpen}>edit</span>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Edit data entry cake</DialogTitle>

                <DialogContent>

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
                        value={dataState.year}
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
                            value={dataState.month}
                            onChange={handleInputChange}
                            label="Month"
                        >
                            {monthList.map((month => <MenuItem value={month}>{month}</MenuItem>))}

                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            type="number"
                            id="sales"
                            label="Sales ($)"
                            value={dataState.sales}
                            name="sales"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            id="cost"
                            type="number"
                            label="Costs ($)"
                            value={dataState.ingredients}
                            name="ingredients"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            multiline={true}
                            id="description"
                            label="Description"
                            value={dataState.description}
                            name="description"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleInputSubmit} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}