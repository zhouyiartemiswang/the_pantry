import React from 'react';
import { Link, Button } from '@material-ui/core';
import './style.css';

export default function Home() {
    return (
        <>
            <div className="cover-img">
            </div>
            <div className="tagline">
                <h1>THE PANTRY</h1>
                <p>A platform for small-scale bakery owners to promote and manage their businesses.</p>
                <Link href="/cakemasters">
                    <Button variant="outlined">Explore More</Button>
                </Link>
            </div>
        </>
    )
}
