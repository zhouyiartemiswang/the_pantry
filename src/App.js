import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Owner from './pages/Owner';
import Footer from './components/Footer';
import Box from '@material-ui/core/Box';

function App() {
    return (
        <BrowserRouter>

            <Switch>
                <Route exact path="/">
                    <NavBar />
                    <Home />
                </Route>
                <Route exact path="/login">
                    <NavBar />
                    <Login />
                </Route>
                <Route exact path="/user/profile">
                    <NavBar />
                    <UserProfile />
                </Route>
                <Route exact path="/owner/dashboard">
                    <Owner page="Dashboard" />
                </Route>
                <Route exact path="/owner/inventory">
                    <Owner page="Inventory" />
                </Route>
            </Switch>

            <Box position="absolute" bottom={0}>
                <Footer />
            </Box>

        </BrowserRouter>
    );
}

export default App;
