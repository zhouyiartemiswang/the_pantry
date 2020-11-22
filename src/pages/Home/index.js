import React from 'react';
import { Toolbar } from '@material-ui/core';
import './style.css';

export default function Home() {
    return (
        <>
            <div className="cover-img">
                <Toolbar />
            </div>
            <div className="tagline">
                <h1 style={{ textAlign: "center" }}>THE PANTRY</h1>
                <p>A platform for small-scale bakery owners to promote and manage their businesses.</p>
            </div>
        </>
    )
}
