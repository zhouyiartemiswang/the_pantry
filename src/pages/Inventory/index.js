import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dialog from '../../components/Dialog';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper, makeStyles } from '@material-ui/core';
import API from '../../utils/API';
import './style.css';

// function createData(item, quantity, unit) {
//     return { item, quantity, unit };
// }

// const rows = [
//     createData("Milk, whole", 5, "gal"),
//     createData("Egg", 10, "dozen"),
//     createData("Butter, unsalted", 10, "lb"),
//     createData("Flour, cake", 50, "lb"),
//     createData("Flour, all-purpose", 73, "lb"),
//     createData("Sugar, granulated", 24, "lb"),
//     createData("Sugar, powered", 10, "lb"),
//     createData("Cream, heavy whipping", 4, "gal"),
//     createData("Vanilla bean, pod", 50, "each"),
//     createData("Chocolate, dark", 14, "lb"),
//     createData("Almond, sliced, toasted", 1, "lb"),
//     createData("Chocolate, milk", 10, "lb"),
//     createData("Coconut, shredded, sweetened", 2, "lb"),
// ];

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
    { id: 'expires', label: 'Expiration Date' },
    { id: 'action', label: 'Action' },
];

function InventoryHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    // we removed the exp date on inventory items, the form no longer needs it
    // should have a default to inform of empty inventory if there is nothing to display
    // you shouldn't be allowed to access the inventory page if you aren't logged in
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
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
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

export default function Inventory() {
    const classes = useStyles();
    const [tokenState, setTokenState] = useState("");
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('quantity');
    const [inventoryState, setInventoryState] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setTokenState(token);
        // console.log(token);
        API.getBaker(token).then(res => {
            console.log(res)
            if (res) {
                setInventoryState(res.Inventories)
            }
        })
    }, [])

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
        // console.log(event.target.id);
        API.deleteInventory(tokenState, event.target.id)
            .then(res => {
                console.log("Item deleted!");
                window.location.reload();
            })
            .catch(err => console.log(err));
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, inventoryState.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size="medium"
                        aria-label="enhanced table"
                    >
                        <InventoryHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
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
                                            <TableCell align="left">{row.expires}</TableCell>
                                            <TableCell align="left">
                                                <Dialog isAddItem={false} id={row.id} />
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
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog isAddItem={true} />
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
        </div>
    );
}