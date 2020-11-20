import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, DialogActions, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        // minWidth: 120,
    },
}));

export default function PreMadeCakeDialog() {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [itemState, setItemState] = useState({
        name: "",
        image: "",
        price: "",
        image: "",
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
                Add Pre-Made Cakes
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Add a pre-made cake to your cake master page</DialogTitle>

                <DialogContent>

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

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            id="ingredients"
                            label="Ingredients"
                            value={itemState.ingredients}
                            name="ingredients"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            id="description"
                            label="Description"
                            value={itemState.description}
                            name="description"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            id="image"
                            label="Image URL"
                            value={itemState.image}
                            name="image"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    {/* <Button color="primary">
                        Upload Image
                    </Button> */}
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