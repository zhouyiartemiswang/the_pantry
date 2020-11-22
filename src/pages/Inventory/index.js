import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../components/Dialog';
import SideNav from '../../components/SideNav';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, makeStyles } from '@material-ui/core';
import './style.css';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    { id: 'item', label: 'Item' },
    { id: 'quantity', label: 'Quantity' },
    { id: 'unit', label: 'Unit' },
    { id: 'action', label: 'Action' },
];

function InventoryHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    headCell.id === "item" ?
                        (<TableCell
                            key={headCell.id}
                            align="left"
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <span className={classes.visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </span>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>)
                        :
                        (<TableCell
                            align={headCell.id === "quantity" ? "right" : "left"}>
                            {headCell.label}
                        </TableCell>)
                ))}
            </TableRow>
        </TableHead>
    );
}

InventoryHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: 240,
        }
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    appBarSpacer: theme.mixins.toolbar,
    // table: {
    //     minWidth: 750,
    // },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function Inventory(props) {
    const classes = useStyles();
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('quantity');
    const [inventoryState, setInventoryState] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        if(props.baker.inventory){
            setInventoryState(props.baker.inventory);
        }
    }, [props.baker.inventory])

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleItemDelete = (event) => {
        props.deleteOne("inventory", event.target.id);
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, inventoryState.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <div className={classes.appBarSpacer} />
            {props.profile.isLoggedIn && props.profile.isOwner ?
                <>
                    <SideNav mobileOpen={props.mobileOpen} handleDrawerToggle={props.handleDrawerToggle} profile={props.profile} />
                    <Paper className={classes.paper}>
                        <TableContainer>
                            <Table
                                className={classes.table}
                                aria-labelledby="tableTitle"
                                size="medium"
                                aria-label="enhanced table"
                            >
                                {/* <colgroup>
                                    <col style={{ width: '20%' }} />
                                    <col style={{ width: '20%' }} />
                                    <col style={{ width: '20%' }} />
                                    <col style={{ width: '20%' }} />
                                </colgroup> */}
                                <InventoryHead
                                    classes={classes}
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {inventoryState.length > 0 ?
                                        <>
                                            {stableSort(inventoryState, getComparator(order, orderBy))
                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                .map((row, index) => {
                                                    const labelId = `enhanced-table-checkbox-${index}`;
                                                    return (
                                                        <TableRow
                                                            hover
                                                            tabIndex={-1}
                                                            key={row.name}
                                                        >
                                                            <TableCell component="th" id={labelId} scope="row">
                                                                {row.name}
                                                            </TableCell>
                                                            <TableCell align="right">{row.quantity}</TableCell>
                                                            <TableCell align="left">{row.metric}</TableCell>
                                                            <TableCell align="left">
                                                                <Dialog isAddItem={false} data={row} editOne={props.editOne} />
                                                                <span
                                                                    className="material-icons"
                                                                    id={row.id}
                                                                    onClick={handleItemDelete}
                                                                >
                                                                    delete</span>
                                                            </TableCell>
                                                        </TableRow>
                                                    );
                                                })}
                                        </>
                                        :
                                        <h1 style={{ textAlign: "center" }}>No inventory items.</h1>
                                    }
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Dialog isAddItem={true} addOne={props.addOne} />
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={inventoryState.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Paper>
                </>
                :
                <div>
                    <h1 style={{ textAlign: "center" }}>You are not authorized to view this page.</h1>
                </div>
            }
        </div>
    );
}