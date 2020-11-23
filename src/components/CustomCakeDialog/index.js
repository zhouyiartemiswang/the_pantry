import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, FormControl, TextField, InputLabel, Select, MenuItem, DialogActions, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

export default function CustomCakeDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [itemState, setItemState] = useState({
        type: "",
        name: "",
        price: ""
    });

    useEffect( function() {
        if(props.data){
            setItemState({ ...itemState, name: props.data.name, price: props.data.price, type: props.data.type });
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
            props.addOne("custom", itemState);
        }
        else{
            props.editOne("custom", props.data.id, itemState);
        }
    }

    return (
        <div>
            {props.isAddItem
                ? <Button className="dialog-btn" variant="outlined" color="default" onClick={handleOpen} > Add Custom Components </Button>
                : <span className="material-icons" onClick={handleOpen}>edit</span>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {props.isAddItem
                    ? <DialogTitle id="form-dialog-title">Add a custom component to your pricing list</DialogTitle>
                    : <DialogTitle id="form-dialog-title">Edit custom component</DialogTitle>
                }

                <DialogContent>

                    <FormControl required className={classes.formControl}>
                        <InputLabel id="type">Type</InputLabel>
                        <Select
                            id="type"
                            value={itemState.type}
                            name="type"
                            onChange={handleInputChange}
                        >
                            <MenuItem value="Size">Size</MenuItem>
                            <MenuItem value="Base">Cake Base</MenuItem>
                            <MenuItem value="Filling">Filling</MenuItem>
                            <MenuItem value="Decoration">Decoration</MenuItem>
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