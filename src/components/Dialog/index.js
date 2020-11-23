import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputLabel, Select, MenuItem, DialogActions, makeStyles } from '@material-ui/core';
import './style.css';

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
        metric: ""
    });

    useEffect( function() {
        if(props.data){
            setItemState({ ...itemState, name: props.data.name, quantity: props.data.quantity, metric: props.data.metric });
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
        setItemState({
            ...itemState,
            [name]: value
        });
    };

    const handleInputSubmit = (event) => {
        event.preventDefault();
        handleClose();
        if (props.isAddItem) {
            props.addOne("inventory", itemState);
        }
        else{
            props.editOne("inventory", props.data.id, itemState);
        }
    }

    return (
        <div>
            {props.isAddItem
                ? <Button className="dialog-btn" variant="outlined" color="default" onClick={handleOpen}>Add Item</Button>
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