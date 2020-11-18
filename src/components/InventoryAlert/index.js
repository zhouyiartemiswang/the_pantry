import React from 'react';
import Typography from '@material-ui/core/Typography';
import './style.css';

export default function InventoryAlert({ lowStockItem }) {
    return (
        <>
            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Low Stock Alerts
            </Typography>
            {lowStockItem.map(item =>
                <Typography component="p" variant="h6" color="secondary" style={{fontSize: 15}} gutterBottom>
                    {item}
                </Typography>
            )}
        </>
    )
}
