import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, DialogActions, makeStyles } from '@material-ui/core';
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

    useEffect(() => {

    }, []);

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

    }

    return (
        <div>
            <span className="material-icons" onClick={handleOpen}>edit</span>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

                <DialogTitle id="form-dialog-title">Edit data entry cake</DialogTitle>

                <DialogContent>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            type="number"
                            id="year"
                            label="Year"
                            value={dataState.year}
                            name="year"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            id="month"
                            label="Month"
                            value={dataState.month}
                            name="month"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <TextField
                            required
                            multiline={true}
                            type="number"
                            id="sales"
                            label="Sale ($)"
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
                            label="Cost"
                            value={dataState.ingredients}
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