import React from 'react';
import SideNav from '../SideNav';
import { AppBar, Toolbar, Typography, Button, Link } from '@material-ui/core';
import { IconButton, makeStyles } from '@material-ui/core';
import './style.css';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
}));

export default function NavBar(props) {
    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    // add a check on the login button to display login or log out based on user state
    // dont remove the nav bar from the home page when the user signs in
    // owner has no way to get back to the site home page after logging in
    // there shouldn't be options that vanish as you change pages (like the shopping cart icon for a non owner when going from the home page to their profile)
    // there shouldn't be a profile button if you aren't logged in
    return (
        <>
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
                        <Link href="/shop">
                            Shop
                                </Link>
                    </Button>
                    {props.isLoggedIn ? null :
                        <>
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
                        </>
                    }
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
            { props.isLoggedIn && props.isOwner ?
                <>
                    <AppBar position="fixed" className={classes.appBar}>
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                            >
                                <span className="material-icons">menu</span>
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                The Pantry
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <SideNav mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </>
                : null
            }
        </>
    )
}
