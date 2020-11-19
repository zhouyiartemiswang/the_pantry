import React from 'react';
import { Toolbar, Link } from '@material-ui/core';
import './style.css';

export default function Logout() {
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
