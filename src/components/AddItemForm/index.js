import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputLabel, Select, MenuItem, DialogActions, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function FormDialog() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [unit, setUnit] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setUnit(event.target.value);
    };

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add Item
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add an Item</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <TextField required autofocus id="item" label="Item" />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField required autofocus type="number" id="quantity" label="Quantity" />
                    </FormControl>
                    <FormControl required className={classes.formControl}>
                        <InputLabel id="unit">Unit</InputLabel>
                        <Select
                            id="unit"
                            value={unit}
                            onChange={handleChange}
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
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}