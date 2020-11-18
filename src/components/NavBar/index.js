import React from 'react';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import './style.css';

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
                    <Link href="/profile">
                        <span className="material-icons">account_circle</span>
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
