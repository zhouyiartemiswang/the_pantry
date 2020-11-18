import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputLabel, Select, MenuItem, DialogActions, makeStyles } from '@material-ui/core';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import './style.css';
import API from '../../utils/API';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function AddItemForm(props) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [itemState, setItemState] = useState({
        name: "",
        quantity: "",
        metric: "",
        expires: ""
    });
    const [selectedDate, setSelectedDate] = useState(new Date('2020-11-18'));

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        const { name, value } = event.target;
        setItemState({
            ...itemState,
            [name]: value
        });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setItemState({
            ...itemState,
            expires: selectedDate
        })
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        handleClose();
        const token = localStorage.getItem("token");
        if (props.isAddItem) {
            API.createInventory(token, itemState)
                .then(res => {
                    console.log("Item added!");
                    window.location.reload();
                })
                .catch(err => console.log(err));
        } else {
            API.editInventory(token, itemState, props.id)
                .then(res => {
                    console.log("Item edited!");
                    window.location.reload();
                })
                .catch(err => console.log(err));
        }
    }

    return (
        <div>
            {props.isAddItem
                ? <Button variant="outlined" color="primary" onClick={handleOpen}>Add Item</Button>
                : <span className="material-icons" onClick={handleOpen}>edit</span>
            }
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {props.isAddItem
                    ? <DialogTitle id="form-dialog-title">Add an Item</DialogTitle>
                    : <DialogTitle id="form-dialog-title">Edit Item</DialogTitle>
                }
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            id="item"
                            label="Item"
                            value={itemState.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            type="number"
                            id="quantity"
                            label="Quantity"
                            value={itemState.quantity}
                            name="quantity"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl required className={classes.formControl}>
                        <InputLabel id="metric">Unit</InputLabel>
                        <Select
                            id="metric"
                            value={itemState.metric}
                            name="metric"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="g">g</MenuItem>
                            <MenuItem value="kg">kg</MenuItem>
                            <MenuItem value="lb">lb</MenuItem>
                            <MenuItem value="oz">oz</MenuItem>
                            <MenuItem value="gal">gal</MenuItem>
                            <MenuItem value="dozen">dozen</MenuItem>
                            <MenuItem value="each">each</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Expiration Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>

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