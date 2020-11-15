import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import './style.css';

export default function NavBar() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    The Pantry
                </Typography>
                <Button color="inherit">Cake Masters</Button>
                <Button color="inherit">
                    <Link>
                        Login
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link>
                        <i class="material-icons">shopping_cart</i>
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    )
}
