import React from 'react';
import SideNav from '../../components/SideNav';
import { Toolbar } from '@material-ui/core';
import './style.css';

export default function Revenue(props) {
    return (
        <div>
            {props.isLoggedIn && props.isOwner ?
                <>
                    <Toolbar />
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} isLoggedIn={props.isLoggedIn} isOwner={props.isOwner} />
                    <h1 style={{ textAlign: "center" }}>Revenue page</h1>
                </>
                :
                <div>
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
                </div>
            }
        </div>
    )
}
