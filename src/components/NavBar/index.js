import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import clsx from 'clsx';
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
    appBarHome: {
        background: "transparent",
        boxShadow: "none",
    },
    appBarSignup: {
        backgroundColor: "grey",
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

function NavBar(props) {
    const classes = useStyles();
    const [isHomePage, setIsHomePage] = useState("");
    const [isSignUpPage, setIsSignUpPage] = useState("");

    useEffect(() => {
        // console.log(props)
        if (props.location.pathname === "/" || props.location.pathname === "/cakemasters" || props.location.pathname === "/shop") {
            setIsHomePage(true);
            console.log("homepage")
        } else if (props.location.pathname === "/signup" || props.location.pathname === "/login" || props.location.pathname === "/profile" || props.location.pathname === "/dashboard" || props.location.pathname === "/premade" || props.location.pathname === "/custom" || props.location.pathname === "/orders" || props.location.pathname === "/inventory" || props.location.pathname === "/revenue" || props.location.pathname === "/logout") {
            setIsSignUpPage(true);
        } else {
            setIsHomePage(false);
            setIsSignUpPage(false);
            // console.log(props.location.pathname);
        }

    }, [])

    return (
        <>
            <AppBar position="fixed" className={clsx(classes.appBar, { [classes.appBarHome]: isHomePage }, { [classes.appBarSignup]: isSignUpPage })}>
                <Toolbar>

                    {/* Menu Icon - shows up on mobile screen */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <span className="material-icons">menu</span>
                    </IconButton>

                    {/* Logo */}
                    <Typography variant="h6" className="logo" noWrap style={{ flex: 1 }}>
                        <Link href="/" underline="none">
                            <img src="https://res.cloudinary.com/artemiswang/image/upload/v1606086097/white_logo_transparent_background_iln8pl.png" alt="the pantry" height="80" />
                        </Link>
                    </Typography>

                    {/* NavBar Tabs - hide on mobile screen */}
                    <div className={classes.mobileTab}>

                        <Link href="/cakemasters" underline="none">
                            <Button className="nav-tab">
                                Cake Masters
                            </Button>
                        </Link>

                        <Link href="/shop" underline="none">
                            <Button className="nav-tab">
                                Shop
                            </Button>
                        </Link>

                        {/* If logged in, logout and account tabs will show up, otherwise sign up and login tabs will show up */}
                        {props.profile.isLoggedIn ?
                            <>
                                {props.profile.isOwner ?
                                    <Link href="/dashboard" underline="none">
                                        <Button className="nav-tab">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    : null
                                }
                                <Link href="/logout" underline="none">
                                    <Button className="nav-tab">
                                        Logout
                                            </Button>
                                </Link>
                                <Link href="/profile" underline="none">
                                    <Button className="nav-tab">
                                        <span className="material-icons">account_circle</span>
                                    </Button>
                                </Link>
                            </>
                            :
                            <>
                                <Link href="/signup" underline="none">
                                    <Button className="nav-tab">
                                        Sign Up
                                    </Button>
                                </Link>
                                <Link href="/login" underline="none">
                                    <Button className="nav-tab">
                                        Login
                                    </Button>
                                </Link>
                            </>
                        }

                    </div>
                </Toolbar>
            </AppBar>

            {/* On mobile screen, SideNav will show up as hidden component and can toggle open and close */}
            {props.mobileOpen ?
                <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                : null
            }

        </>
    )
}

export default withRouter(NavBar);
