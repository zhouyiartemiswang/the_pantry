import React from 'react';
import { Divider, List, Link, ListItem, ListItemText, Hidden, Drawer } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    toolbar: theme.mixins.toolbar, // Add top spacing so content won't cover by NavBar
    drawerPaper: {
        width: drawerWidth,
    },
    mobileTab: {
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    }
}));

function SideNav(props) {
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    console.log(props)
    const drawer = (
        <>
            <div className={classes.toolbar} />
            <Divider />
            {props.profile.isLoggedIn && props.profile.isOwner ?
                (<>
                    <List>
                        {[
                            ['Dashboard', '/profile', 'dashboard'],
                            ['Pre-made Cakes', '/premade', 'cake'],
                            ['Custom Cakes', '/custom', 'cake'],
                            ['Orders', '/orders', 'assignment'],
                            ['Inventory', '/inventory', 'list_alt'],
                            ['Revenue', '/revenue', 'bar_chart']
                        ].map((text) => (
                            <Link href={text[1]}>
                                <ListItem button key={text[0]}>
                                    <span className="material-icons">{text[2]}</span>
                                    <ListItemText primary={text[0]} />
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                </>)
                :
                null
            }
            <List className={classes.mobileTab}>

                {props.profile.isLoggedIn ?
                    [
                        ['Cake Masters', '/cakemasters', 'near_me'],
                        ['Shop', '/shop', 'shopping_bag'],
                        ['Cart', '/cart', 'shopping_cart'],
                        ['Account', '/profile', 'account_circle'],
                        ['Logout', '/logout', 'logout']
                    ].map((text) => (
                        <Link href={text[1]}>
                            <ListItem button key={text[0]}>
                                <span className="material-icons">{text[2]}</span>
                                <ListItemText primary={text[0]} />
                            </ListItem>
                        </Link>
                    ))
                    :
                    [
                        ['Cake Masters', '/cakemasters', 'near_me'],
                        ['Shop', '/shop', 'shopping_bag'],
                        ['Signup', '/signup', 'how_to_reg'],
                        ['Login', '/login', 'login'],
                        ['Cart', '/cart', 'shopping_cart']
                    ].map((text) => (
                        <Link href={text[1]}>
                            <ListItem button key={text[0]}>
                                <span className="material-icons">{text[2]}</span>
                                <ListItemText primary={text[0]} />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        </>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <nav className={classes.drawer}>
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={props.mobileOpen}
                        onClose={props.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
}

export default SideNav;