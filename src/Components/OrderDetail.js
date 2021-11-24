import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from 'react-router';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container, Divider, FormLabel, Typography, Button, Box, AppBar, Toolbar } from "@material-ui/core";
import { Item } from "./Item";
function OrderDetail(props) {
    const [order, setOrder] = useState({});
    const [orderProductList, setOrderProductList] = useState([]);
    const [userData, setUserData] = useState({});
    const [user] = useAuthState(auth);
    const history = useHistory();
    const signOut = async () => {
        await auth.signOut();
        history.replace("/login");
    }
    useEffect(() => {
        if (!user) {
            history.push("/");
        }
    }, []);
    useEffect(() => {
        let apiUrl;
        apiUrl = `https://www.alfanzo.com:443/`;
        console.log(props.location.id);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch(apiUrl + 'order/' + props.location.id, requestOptions)
            .then(response => response.json())
            .then(data => {
                setOrder(data.order);
                setOrderProductList(data.orderProductList);
                setUserData(data.user);
            }
            );
    }, []);
    const detail = (val) => {
        let jsonVal = JSON.parse(val)
        return jsonVal.hasOwnProperty('en') ? jsonVal.en : jsonVal;
    }
    let total = 0;

    if (orderProductList.length > 0) {
        orderProductList.forEach(row => total = row.total + total)
    }
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" style={{ backgroundColor: '#2E3B55', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" color="white">
                            Jeevamrut
                        </Typography>
                        <Button variant='contained' color="secondary" onClick={signOut}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Container maxWidth="md" fixed={false}>
                <Table className="table" aria-label="spanning table">
                    <TableHead >
                        <TableRow>
                            <TableCell>
                                <Item />
                            </TableCell>
                            <TableCell>
                                <FormLabel style={{ color: 'black' }}> Order No : {props.location.id} </FormLabel>
                            </TableCell>
                            <TableCell>
                                <FormLabel style={{ color: 'black' }}>Date: {order.createdAt} </FormLabel>
                            </TableCell>
                            <TableCell>
                                <FormLabel style={{ color: 'black' }}>Status: {order.deliveryStatus} </FormLabel>
                            </TableCell>
                        </TableRow>
                        <TableRow style={{}}>
                            <TableCell>
                                <FormLabel style={{ color: 'black' }}> Name : {userData.name} </FormLabel>
                            </TableCell>
                            <TableCell>
                                <FormLabel style={{ color: 'black' }}> Mobile : {userData.mobileNumber} </FormLabel>
                            </TableCell>
                            <TableCell>
                                <FormLabel style={{ color: 'black' }}> Email : {userData.email} </FormLabel>
                            </TableCell>

                        </TableRow>
                    </TableHead>
                </Table>
            </Container>
            <Divider />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            <TableCell style={{ color: 'wheat' }}>Sl.No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>Desc</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Qty</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Unit Cost</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderProductList.length > 0 ? orderProductList.map((row, index) => (
                            <TableRow key={row.vendorProduct.product.title}>
                                <TableCell align="left">{index + 1}</TableCell>
                                <TableCell>{detail(row.vendorProduct.product.title)}</TableCell>
                                <TableCell align="center">{row.quantity}</TableCell>
                                <TableCell align="center">{row.vendorProduct.product.price}</TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                            </TableRow>
                        )) : <TableRow> <TableCell align="center" colSpan={4}>No Data Found</TableCell> </TableRow>}
                        {/*<TableRow>*/}
                        {/*    <TableCell rowSpan={3}/>*/}
                        {/*    <TableCell colSpan={2}>Subtotal</TableCell>*/}
                        {/*    <TableCell align="right">{120}</TableCell>*/}
                        {/*</TableRow>*/}
                        {/*<TableRow>*/}
                        {/*    <TableCell>Tax</TableCell>*/}
                        {/*    <TableCell align="right">{`${(0.5 * 100).toFixed(0)} %`}</TableCell>*/}
                        {/*    <TableCell align="right">{100}</TableCell>*/}
                        {/*</TableRow>*/}
                        <TableRow>
                            <TableCell rowSpan={3} />
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default OrderDetail
