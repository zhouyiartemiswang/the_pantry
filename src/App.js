import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Shop from './pages/Shop';
import UserProfile from './pages/UserProfile';
import Owner from './pages/Owner';
import Footer from './components/Footer';
import Box from '@material-ui/core/Box';
import API from './utils/API';

function App() {
    const [loginFormState, setLoginFormState] = useState({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtpckBraXIua2lyIiwiaWQiOjMsImFkZHJlc3MiOiJzdHJlZXQiLCJwaG9uZSI6IjU1NTU1NTU1NTUiLCJpc093bmVyIjp0cnVlLCJpYXQiOjE2MDU2Mzc3MDMsImV4cCI6MTYwNTY0NDkwM30.RFIGKY8D8AisGXLz6VqNUISUPvgPh6PMvdrOSczyIfU",
        data: { sale: 15, ingredients: "stuff", deadline: "2020-11-17", status: "pending", description: "desc" },
        token2: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImthdEBrYXQua2F0IiwiaWQiOjIsImFkZHJlc3MiOiJzdHJlZXQiLCJwaG9uZSI6IjU1NTU1NTU1NTUiLCJpc093bmVyIjpmYWxzZSwiaWF0IjoxNjA1NjM4MDIyLCJleHAiOjE2MDU2NDUyMjJ9.lQrAbrVmcjclGWYOpZ0Fbo_MdV5Io4Ei5q-BnhIIds4",
        data2: { sale: 25, ingredients: "stuff", deadline: "2020-11-17", status: "pending", description: "desc", baker_id: 1 }
    });

    useEffect(fetchUserData, []);

    function fetchUserData() {
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
                <Route exact path="/shop">
                    <NavBar />
                    <Shop />
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
