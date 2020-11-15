import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Copyright from './components/Copyright';
import Box from '@material-ui/core/Box';

function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route exact path="/login">
                    <Login />
                </Route>
            </Switch>
            <Box mt={8}>
                <Copyright />
            </Box>
        </BrowserRouter>
    );
}

export default App;
