import React, { useState, useEffect } from 'react';
import SideNav from '../../components/SideNav';
import PreMadeCakeDialog from '../../components/PreMadeCakeDialog';
import CustomCakeDialog from '../../components/CustomCakeDialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles } from '@material-ui/core';
import './style.css';

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: theme.spacing(15),
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.up('sm')]: {
            marginLeft: 400,
            marginRight: theme.spacing(20),
        }
    },
}));

export default function CakePricing(props) {
    const classes = useStyles();
    const [cakeListState, setCakeListState] = useState([]);

    useEffect(function () {
        if (props.isPreMade) {
            if (props.baker.preMade) {
                setCakeListState(props.baker.preMade);
            }
        }
        else {
            if (props.baker.pricing) {
                setCakeListState(props.baker.pricing);
            }
        }
    }, [props.baker]);

    function handleItemDelete(event) {
        if (props.isPreMade) {
            props.deleteOne("premade", event.target.id);
        }
        else {
            props.deleteOne("custom", event.target.id);
        }
    };

    const headList = props.isPreMade
        ? ["Image", "Name", "Price ($)", "Ingredients", "Description", "Action"]
        : ["Type", "Name", "Price ($)", "Action"];

    return (
        <>
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                    <div className={classes.container}>
                        <TableContainer component={Paper}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        {headList.map(head =>
                                            <TableCell align="center">{head}</TableCell>
                                        )}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cakeListState.map((row) => (
                                        <TableRow key={row.id}>
                                            {props.isPreMade ?
                                                <>
                                                    <TableCell width="20%" align="center">
                                                        <img src={row.img} alt={row.name} style={{ height: "100px" }} />
                                                    </TableCell>
                                                    <TableCell align="center">{row.name}</TableCell>
                                                    <TableCell align="center">{row.price}</TableCell>
                                                    <TableCell align="center">{row.ingredients}</TableCell>
                                                    <TableCell align="center">{row.description}</TableCell>
                                                </>
                                                :
                                                <>
                                                    <TableCell width="20%" align="center">{row.type}</TableCell>
                                                    <TableCell width="20%" align="center">{row.name}</TableCell>
                                                    <TableCell width="20%" align="center">{row.price}</TableCell>
                                                </>
                                            }
                                            <TableCell width="20%" align="center">
                                                {props.isPreMade
                                                    ? <PreMadeCakeDialog isPreMade={props.isPreMade} isAddItem={false} data={row} editOne={props.editOne} />
                                                    : <CustomCakeDialog isPreMade={props.isPreMade} isAddItem={false} data={row} editOne={props.editOne} />
                                                }
                                                <span
                                                    className="material-icons"
                                                    id={row.id}
                                                    onClick={handleItemDelete}
                                                >
                                                    delete</span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                                {props.isPreMade
                                    ? <PreMadeCakeDialog isPreMade={props.isPreMade} isAddItem={true} addOne={props.addOne} />
                                    : <CustomCakeDialog isPreMade={props.isPreMade} isAddItem={true} addOne={props.addOne} />
                                }
                            </Table>
                        </TableContainer>
                    </div>
                </>
                :
                <div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h2 style={{ textAlign: "center" }}>You are not authorized to view this page. Please log in!</h2>
                </div>
            }

        </>
    );
}