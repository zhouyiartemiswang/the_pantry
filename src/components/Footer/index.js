import React from 'react';
import { Typography, Link } from '@material-ui/core';

export default function Footer() {
    return (
        <div className="footer">
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    The Pantry
                </Link>
                {' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    )
}
