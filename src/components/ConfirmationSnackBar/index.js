import React, { useState } from 'react';
import { Button, Snackbar, IconButton } from '@material-ui/core';
import './style.css';

export default function ConfirmationSnackBar(props) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div>
            <span
                className="material-icons"
                onClick={handleClick}
            >
                delete</span>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={`Delete ${props.name}?`}
                action={
                    <React.Fragment>
                        <Button
                            color="secondary"
                            size="small"
                            id={props.id}
                            onClick={props.handleItemDelete}>
                            YES
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <span
                                className="material-icons"
                            >
                                close</span>
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}