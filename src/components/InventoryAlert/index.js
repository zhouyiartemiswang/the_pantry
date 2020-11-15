import React from 'react';
import Typography from '@material-ui/core/Typography';
import './style.css';

export default function InventoryAlert() {
    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Alerts
            </Typography>
            <Typography component="p" variant="h9" color="secondary" gutterBottom>
                Whole Milk is low in stock.
            </Typography>
        </>
    )
}
