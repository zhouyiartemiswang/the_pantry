import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, DialogActions, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function PreMadeCakeDialog() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [itemState, setItemState] = useState({
        name: "",
        image: "",
        // size: "",
        price: "",
        ingredients: "",
        description: "",
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setItemState({
            ...itemState,
            [name]: value
        });
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        handleClose();
        const token = localStorage.getItem("token");
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleOpen}>Add Pre-Made Cakes</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a pre-made cake to your cake master page</DialogTitle>
                <DialogContent>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            id="name"
                            label="Name"
                            value={itemState.name}
                            name="name"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            type="number"
                            id="size"
                            label="Size (in)"
                            value={itemState.size}
                            name="size"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            type="number"
                            id="price"
                            label="Price&nbsp;($)"
                            value={itemState.price}
                            name="price"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            id="ingredients"
                            label="Ingredients"
                            value={itemState.ingredients}
                            name="ingredients"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <TextField
                            required autoFocus
                            id="description"
                            label="Description"
                            value={itemState.description}
                            name="description"
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </DialogContent>

                <DialogActions>
                    <Button color="primary">
                        Upload Image
                    </Button>
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