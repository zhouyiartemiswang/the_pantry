import React, { useState, useEffect } from 'react';
import { Toolbar, Link } from '@material-ui/core';
import './style.css';

export default function Logout(props) {
    useEffect(logoutUser, []);

    function logoutUser(){
        localStorage.clear();
        props.setProfileState({
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

    return (
        <div>
            <Toolbar/>
            <h1>You have successfully logged out.</h1>
            <Link href="/">
                Go to Home Page
            </Link>
        </div>
    )
}
