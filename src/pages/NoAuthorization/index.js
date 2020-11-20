import React from 'react';
import { Toolbar } from '@material-ui/core';

export default function NoAuthorization() {
    return (
        <div>
            <Toolbar/>
            <h1>You are not authorized to view this page.</h1>
        </div>
    )
}
