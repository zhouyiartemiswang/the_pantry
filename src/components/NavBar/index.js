import React from 'react';
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
    return (
        <>
            { props.isOwner ?
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
                </>
                :
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
                </>
            }
        </>
    )
}
