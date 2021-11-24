import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
function B2bCheckOutDialog(props) {
    const { checkopen, orders, handleOk, handleClose, handleDelete } = props;
    console.log(orders);
    // const handleClose = () => {
    //     onClose();
    // };
    const handleCancel = () => {
        alert("You didn't Confirm your Order!")
        handleClose();
    };
    return (
        <Dialog open={checkopen}>
            <DialogTitle>Your Orders:
                <IconButton
                    aria-label="close"
                    onClick={handleCancel}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Commodity</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    {orders.map(orders => (
                        <TableBody key={orders.productid}>
                            <TableRow>
                                <TableCell component="th" scope="row">
                                    {orders.name}
                                </TableCell>
                                <TableCell align="right">
                                    {orders.quantity}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleDelete(orders.productid)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
                </Table>
            </TableContainer>
            <Button variant='contained' color="primary" onClick={handleOk} >Ok</Button>
        </Dialog>
    );
}
export default B2bCheckOutDialog;