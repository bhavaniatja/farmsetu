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

function CheckOutDialog(props) {
    const { checkopen, orders, handleOk } = props;
    console.log(orders);
    // const handleClose = () => {
    //     onClose();
    // };
    // const handleCancel = () => {
    //     onClose();
    // };
    return (
        <Dialog onClose={handleOk} open={checkopen}>
            <DialogTitle>Your Submissions:
            </DialogTitle>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Commodity</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Farm Name</TableCell>
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
                                    {orders.farmName}
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
export default CheckOutDialog;