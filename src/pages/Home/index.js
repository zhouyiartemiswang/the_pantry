import React from 'react';
import { Toolbar } from '@material-ui/core';
import './style.css';

export default function Home() {
    return (
        <div>
            <Toolbar/>
            <h1 style={{textAlign: "center"}}>Home page</h1>
        </div>
    )
}
