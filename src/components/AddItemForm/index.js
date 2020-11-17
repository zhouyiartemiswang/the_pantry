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
    const [itemState, setItemState] = useState({
        name: "",
        quantity: "",
        metric: ""
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        console.log(event.target.name);
        const { name, value } = event.target;
        setItemState({
            ...itemState,
            [name]: value
        });
    };

    const handleAddItem = () => {
        handleClose();
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Add Item
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add an Item</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autofocus
                            id="item"
                            label="Item"
                            value={itemState.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autofocus
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
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddItem} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}