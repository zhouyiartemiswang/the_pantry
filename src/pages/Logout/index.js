import React, { useEffect } from 'react';
import { Toolbar, Link, Button } from '@material-ui/core';
import './style.css';

export default function Logout(props) {
    useEffect(logoutUser, []);

    function logoutUser() {
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
        props.setBuyerProfileState({
            message: "please log in"
        });
        props.setBakerProfileState({
            message: "please log in"
        });
    }

    return (
        <div className="container">
            <Toolbar />
            <h1 className="logout-message">You have successfully logged out.</h1>
        </div>
    )
}
