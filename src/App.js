import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, useHistory } from 'react-router-dom';
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
import Box from '@material-ui/core/Box';
import API from './utils/API';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState("");
    const [isOwner, setIsOwner] = useState("");
    const [loginFormState, setLoginFormState] = useState({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpckBraXIua2lyIiwiaWQiOjMsImFkZHJlc3MiOiJzdHJlZXQiLCJwaG9uZSI6IjU1NTU1NTU1NTUiLCJpc093bmVyIjp0cnVlLCJpYXQiOjE2MDU2Mzc3MDMsImV4cCI6MTYwNTY0NDkwM30.RFIGKY8D8AisGXLz6VqNUISUPvgPh6PMvdrOSczyIfU",
        data: { sale: 15, ingredients: "stuff", deadline: "2020-11-17", status: "pending", description: "desc" },
        token2: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdEBrYXQua2F0IiwiaWQiOjIsImFkZHJlc3MiOiJzdHJlZXQiLCJwaG9uZSI6IjU1NTU1NTU1NTUiLCJpc093bmVyIjpmYWxzZSwiaWF0IjoxNjA1NjM4MDIyLCJleHAiOjE2MDU2NDUyMjJ9.lQrAbrVmcjclGWYOpZ0Fbo_MdV5Io4Ei5q-BnhIIds4",
        data2: { sale: 25, ingredients: "stuff", deadline: "2020-11-17", status: "pending", description: "desc", baker_id: 1 }
    });

    useEffect(fetchUserData, []);

    function fetchUserData() {
        setIsLoggedIn(true);
        setIsOwner(true);
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

    // let history = useHistory();
    // const handleNoAuthorization = () => {
    //     if (!isLoggedIn) {
    //         history.push("/noauth");
    //     }
    // };

    return (
        <BrowserRouter>
            <NavBar isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

            <Switch>
                <Route exact path="/">
                    <Home isLoggedIn={isLoggedIn} isOwner={isOwner}mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                </Route>
                <Route exact path="/cakemasters">
                    <CakeMasters isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </Route>
                <Route exact path="/signup">
                    <Signup isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                </Route>
                <Route exact path="/login">
                    <Login isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                </Route>
                <Route exact path="/logout">
                    <Logout isLoggedIn={isLoggedIn} />
                </Route>
                <Route exact path="/shop">
                    <Shop mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                </Route>
                <Route exact path="/profile">
                    <UserProfile isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </Route>
                <Route exact path="/premade">
                    <CakePricing isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} isPreMade={true} />
                </Route>
                <Route exact path="/custom">
                    <CakePricing isLoggedIn={isLoggedIn} isOwner={isOwner} isPreMade={false} />
                </Route>
                <Route exact path="/orders">
                    <Orders isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </Route>
                <Route exact path="/inventory">
                    <Inventory isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
                </Route>
                <Route exact path="/revenue">
                    <Revenue isLoggedIn={isLoggedIn} isOwner={isOwner} mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
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
    );
}

export default App;
