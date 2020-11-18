import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import './style.css';
// add a check on the login button to display login or log out based on user state
// have a link to profile
// have a link to orders
export default function NavBar() {

    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6" className="nav-tab" noWrap style={{ flex: 1 }}>
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
                    <Link href="/signup">
                        Sign Up
                    </Link>
                </Button>
                <Button className="nav-tab">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
                <Button className="nav-tab">
                    <Link href="/cart">
                        <span className="material-icons">shopping_cart</span>
                    </Link>
                </Button>
            </Toolbar>
        </AppBar>
    )
}
