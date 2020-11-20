import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import CakeMasters from './pages/CakeMasters';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Shop from './pages/Shop';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import CakePricing from './pages/CakePricing';
import Orders from './pages/Orders';
import Inventory from './pages/Inventory';
import Revenue from './pages/Revenue';
import NoAuthorization from './pages/NoAuthorization';
import Footer from './components/Footer';
import { Box, makeStyles } from '@material-ui/core';
import API from './utils/API';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
}));

function App() {
    const classes = useStyles();
    const [profileState, setProfileState] = useState({
        name: "",
        email: "",
        token: "",
        id: "",
        isOwner: false,
        isLoggedIn: false,
        loginError: "",
        signUpError: ""
      });

    useEffect(fetchUserData, []);

    function fetchUserData() {
        const token = localStorage.getItem("token");
        API.getProfile(token).then(function(profileData) {
            if(profileData){
                setProfileState({
                    name: profileData.name,
                    email: profileData.email,
                    token: token,
                    id: profileData.id,
                    isOwner: profileData.isOwner,
                    isLoggedIn: true,
                    loginError: "",
                    signUpError: ""
                });
            }
            else{
                localStorage.removeItem("token");
                setProfileState({
                    name: "",
                    email: "",
                    token: "",
                    id: "",
                    isOwner: false,
                    isLoggedIn: false,
                    loginError: "",
                    signUpError: ""
                });
            }
        });
        // API.getEditOrder(loginFormState.token, loginFormState.data).then(data => {
        //   if (data) {
        //     console.log("users", data);
        //   } else {
        //     console.log("nothing to see here");
        //   }
        // });
        // API.createOrder(loginFormState.token2, loginFormState.data2).then(data => {
        //     if (data) {
        //       console.log("users", data);
        //     } else {
        //       console.log("nothing to see here");
        //     }
        //   });
        // API.getOneOrder(5).then(data => {
        //     if (data) {
        //         console.log(data);
        //     } else {
        //         console.log("nothing to see here");
        //     }
        // });
        // API.deleteOrder(loginFormState.token, 1).then(data => {
        //     if (data) {
        //         console.log(data);
        //     }else {
        //         console.log("nothing to see here");
        //     }
        // });
    }
    
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <div className={classes.root}>
            <BrowserRouter>
                <NavBar profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

                <Switch>
                    <Route exact path="/">
                        <Home profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                    </Route>
                    <Route exact path="/cakemasters">
                        <CakeMasters profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/signup">
                        <Signup profile={profileState} setProfileState={setProfileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                    </Route>
                    <Route exact path="/login">
                        <Login profile={profileState} setProfileState={setProfileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                    </Route>
                    <Route exact path="/logout">
                        <Logout profile={profileState} setProfileState={setProfileState} />
                    </Route>
                    <Route exact path="/shop">
                        <Shop mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                    </Route>
                    <Route exact path="/profile">
                        <UserProfile profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/premade">
                        <CakePricing profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} isPreMade={true} />
                    </Route>
                    <Route exact path="/custom">
                        <CakePricing profile={profileState} isPreMade={false} />
                    </Route>
                    <Route exact path="/orders">
                        <Orders profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/inventory">
                        <Inventory profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/revenue">
                        <Revenue profile={profileState} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    <Route exact path="/noauth">
                        <NoAuthorization mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                    </Route>
                    {/* <Route>
                        <Home />
                    </Route> */}
                </Switch>

                <Box position="absolute" bottom={0}>
                    <Footer />
                </Box>

            </BrowserRouter>
        </div>
    );
}

export default App;
