import React, { useState } from 'react';
import SideNav from '../SideNav';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import { IconButton, makeStyles } from '@material-ui/core';
import './style.css';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    mobileTab: {
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    }
}));

export default function NavBar(props) {
    const classes = useStyles();
    // const [mobileOpen, setMobileOpen] = useState(false);

    // const handleDrawerToggle = () => {
    //     setMobileOpen(!mobileOpen);
    // };
    // add a check on the login button to display login or log out based on user state
    // dont remove the nav bar from the home page when the user signs in
    // owner has no way to get back to the site home page after logging in
    // there shouldn't be options that vanish as you change pages (like the shopping cart icon for a non owner when going from the home page to their profile)
    // there shouldn't be a profile button if you aren't logged in
    // console.log(props);
    return (
        <>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <span className="material-icons">menu</span>
                    </IconButton>
                    <Typography variant="h6" className="nav-tab" noWrap style={{ flex: 1 }}>
                        The Pantry
                    </Typography>
                    <div className={classes.mobileTab}>
                        <Link href="/cakemasters">
                            <Button className="nav-tab">
                                Cake Masters
                        </Button>
                        </Link>
                        <Link href="/shop">
                            <Button className="nav-tab">
                                Shop
                        </Button>
                        </Link>
                        {props.isLoggedIn ?
                            <Link href="/logout">
                                <Button className="nav-tab">
                                    Logout
                            </Button>
                            </Link>
                            :
                            <>
                                <Link href="/signup">
                                    <Button className="nav-tab">
                                        Sign Up
                                </Button>
                                </Link>
                                <Link href="/login">
                                    <Button className="nav-tab">
                                        Login
                                </Button>
                                </Link>
                            </>
                        }
                        <Link href="/profile">
                            <Button className="nav-tab">
                                <span className="material-icons">account_circle</span>
                            </Button>
                        </Link>
                        <Link href="/cart">
                            <Button className="nav-tab">
                                <span className="material-icons">shopping_cart</span>
                            </Button>
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>

            {props.mobileOpen ?
                <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} isLoggedIn={props.isLoggedIn} isOwner={props.isOwner} />
                : null
            }

        </>
    )
}
