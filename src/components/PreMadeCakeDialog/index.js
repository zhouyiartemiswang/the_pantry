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
    const [itemState, setItemState] = useState({
        name: "",
        price: "",
        img: "",
        ingredients: "",
        description: "",
    });

    useEffect( function() {
        if(props.data){
            setItemState({ ...itemState, name: props.data.name, price: props.data.price, img: props.data.img, ingredients: props.data.ingredients, description: props.data.description });
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

    function handleInputSubmit(event) {
        event.preventDefault();
        handleClose();
        if(props.isPreMade){
            if (props.isAddItem) {
                props.addOne("premade", itemState);
            }
            else{
                props.editOne("premade", props.data.id, itemState);
            }
        }
        else if(!props.isPreMade){
            if (props.isAddItem) {
                props.addOne("custom", itemState);
            }
            else{
                props.editOne("custom", props.data.id, itemState);
            }
        }
        else{
            console.log("hi?");
        }
    }

    var myWidget = window.cloudinary.createUploadWidget({
        cloudName: process.env.REACT_APP_CLOUDINARY_NAME, 
        uploadPreset: process.env.REACT_APP_CLOUDINARY_PRESET}, (error, result) => { 
          if (!error && result && result.event === "success") { 
            // console.log('Done! Here is the image info: ', result.info);
            // console.log(result.info.url); 
            setItemState({
                ...itemState,
                img: result.info.url
            });
          }
        }
      )

    function handleCloud () {
        myWidget.open();
    }

    return (
        <div>
            {props.isAddItem
                ? <Button variant="outlined" color="primary" onClick={handleOpen} > Add Pre-Made Cakes </Button>
                : <span className="material-icons" onClick={handleOpen}>edit</span>
            }

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                {props.isAddItem
                    ? <DialogTitle id="form-dialog-title">Add a pre-made cake to your cake master page</DialogTitle>
                    : <DialogTitle id="form-dialog-title">Edit pre-made cake</DialogTitle>
                }
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
                            value={itemState.img}
                            name="image"
                            onChange={handleInputChange}
                        />
                    </FormControl>

                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloud} color="primary">
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