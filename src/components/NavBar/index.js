import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import './style.css';

export default function NavBar() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" className="nav-tab" style={{ flex: 1 }}>
                    <Link href="/">
                        The Pantry
                    </Link>
                </Typography>
                <Button className="nav-tab">
                    <Link href="/cakemasters">
                        Cake Masters
                    </Link>
                </Button>
                <Button className="nav-tab">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
                <Button className="nav-tab">
                    <Link href="/cart">
                        <i class="material-icons">shopping_cart</i>
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    )
}