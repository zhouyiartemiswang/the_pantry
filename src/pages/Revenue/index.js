import React from 'react';
import SideNav from '../../components/SideNav';
import { Toolbar } from '@material-ui/core';
import './style.css';

export default function Revenue(props) {
    return (
        <div>
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <Toolbar />
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
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
