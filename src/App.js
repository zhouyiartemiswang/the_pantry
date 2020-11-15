import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Footer from './components/Footer';
import Box from '@material-ui/core/Box';

function App() {
    return (
        <BrowserRouter>
            {/* <NavBar /> */}
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
                <Route exact path="/dashboard">
                    <Dashboard />
                </Route>
            </Switch>
            <Box position="absolute" bottom={0}>
                <Footer />
            </Box>
        </BrowserRouter>
    );
}

export default App;
