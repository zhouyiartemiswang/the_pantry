import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputLabel, Select, MenuItem, DialogActions, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function CustomCakeDialog() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [itemState, setItemState] = useState({
        type: "",
        name: "",
        price: ""
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        // console.log(event.target.name);
        // console.log(event.target.value);
        const { name, value } = event.target;
        setItemState({
            ...itemState,
            [name]: value
        });
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        // const token = localStorage.getItem("token");
        // console.log(itemState);
        handleClose();
    }

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleOpen}
            >
                Add Custom Components
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Add a custom component to your pricing list</DialogTitle>

                <DialogContent>

                    <FormControl required className={classes.formControl}>
                        <InputLabel id="type-label">Type</InputLabel>
                        <Select
                            labelId="type-label"
                            id="type"
                            value={itemState.type}
                            name="type"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="size">Size</MenuItem>
                            <MenuItem value="base">Cake Base</MenuItem>
                            <MenuItem value="filling">Filling</MenuItem>
                            <MenuItem value="decoration">Decoration</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            id="name"
                            label="Name"
                            value={itemState.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            type="number"
                            id="price"
                            label="Price&nbsp;($)"
                            value={itemState.price}
                            name="price"
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