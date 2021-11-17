// import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { auth, firestore } from "../firebase"
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Paper from '@mui/material/Paper';
// import { Toolbar, Typography, TextField, Alert, Container, Stack, FormHelperText, Divider } from '@mui/material';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import FarmerDialog from './FarmerDialog';
// import Box from "@mui/material/Box";
// import { ListItem, Chip } from '@mui/material';
//
// import { AddShoppingCart, PhotoCamera } from '@mui/icons-material';
// import CheckOutDialog from './CheckOutDialog';
// function FarmerDashBoard() {
//     const [products, setProducts] = useState([]);
//     const [dataname, setDataName] = useState("");
//     const [dataid, setDataId] = useState("");
//     const [orders, setOrders] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [checkopen, setCheckOpen] = useState(false);
//     const [user] = useAuthState(auth);
//     const history = useHistory();
//     const signOut = async () => {
//         await auth.signOut();
//         history.replace("/login");
//     }
//     useEffect(() => {
//         if (!user) {
//             history.replace("/login");
//         }
//     }, [user]);
//     useEffect(async () => {
//         let list = [];
//         await firestore.collection('commodities').get().then(querySnapshot => {
//             console.log('Total Commodities ', querySnapshot.size);
//             querySnapshot.forEach(documentSnapshot => {
//                 // setProducts({
//                 //     ...products,
//                 //     name: documentSnapshot.data()
//                 // });
//                 list.push(documentSnapshot.data());
//             })
//         });
//
//         setProducts(list);
//         console.log(products);
//     }, [user]);
//     const handleSubmit = async (event, dataname, quantity, farmName, dataid) => {
//         event.preventDefault();
//         console.log(quantity);
//         const timestamp = Date.now();
//         if (quantity != "") {
//             // setOrders((orders) => orders.filter((order) => order.productid !== dataid));
//             const namez = dataname;
//             let newOrder = {
//                 name: namez,
//                 productid: dataid,
//                 quantity: quantity,
//                 farmName: farmName,
//                 createdAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
//             }
//             setOrders([...orders, newOrder]);
//         }
//         setOpen(false);
//         // setButtonId((prev) => [...prev, butid]);
//     }
//     const checkOut = async () => {
//         console.log(orders);
//         if (orders[0] == null) {
//             alert("Cart is Empty");
//         }
//         else {
//             await firestore.collection('farmerorders').doc(user.uid)
//                 .update({
//                     orders: orders
//                 });
//             setCheckOpen(true);
//         }
//     }
//     const handleClickOpen = (event, dataname, dataid) => {
//         event.preventDefault();
//         setDataName(dataname);
//         setDataId(dataid);
//         setOpen(true);
//     };
//
//     const handleClose = () => {
//         setOpen(false);
//     };
//     const handleOk = () => {
//         setCheckOpen(false);
//         setOrders([]);
//         alert("Submission Sent Successfully:)");
//     };
//     const handleDelete = (dataid) => () => {
//         setOrders((orders) => orders.filter((order) => order.productid !== dataid));
//         console.log(orders);
//     };
//
//     return (
//         <div>
//             <Box sx={{ flexGrow: 1 }}>
//                 <AppBar position="static">
//                     <Toolbar variant="dense" style={{ backgroundColor: '#2E3B55', display: 'flex', justifyContent: 'space-between' }}>
//                         <Typography variant="h6" color="inherit">
//                             Jeevamrut
//                         </Typography>
//                         <Button variant='contained' color="secondary" onClick={signOut}>Logout</Button>
//                     </Toolbar>
//                 </AppBar>
//             </Box>
//             <Alert severity="info" style={{ display: 'flex', justifyContent: 'center' }}>Confirm Your Produce for Wednesday/Saturday</Alert>
//             <Paper
//                 sx={{
//                     display: 'flex',
//                     // flexDirection: 'row',
//                     // alignContent: 'flex-start',
//                     flexWrap: 'wrap',
//                     p: 0.5,
//                     m: 0,
//                 }}
//             >
//                 <Chip
//                     label="Delete Duplicate Entries Before Checkout : "
//                     color='success'
//                     style={{ margin: 2 }}
//                 />
//                 {orders.map((data, key) => {
//                     return (
//                         <Chip
//                             label={data.name + " : " + data.quantity}
//                             color='primary'
//                             onDelete={handleDelete(data.productid)}
//                             style={{ margin: 2 }}
//                         />
//                     );
//                 })}
//             </Paper>
//             <Container style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottom: 30 }}>
//                 <Stack spacing={2}>
//                     {products && products.map((data) => (
//                         <Card style={{ minWidth: 300 }} key={data.id}>
//                             <CardContent style={{ marginBottom: -20 }}>
//                                 <Typography variant="h5" component="div">
//                                     {data.name}
//                                 </Typography>
//                             </CardContent>
//                             <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
//                                 <Button variant='contained' color="primary"
//                                     onClick={(ev) => handleClickOpen(ev, data.name, data.id)} >Enter Quantity</Button>
//                             </CardActions>
//                         </Card>
//                     ))}
//                 </Stack>
//             </Container>
//             <Container style={{ position: 'fixed', bottom: 1, display: 'flex', alignItems: 'center' }}>
//                 <Button fullWidth={true} variant="contained"
//                     onClick={() => checkOut()} endIcon={<AddShoppingCart />}>
//                     CheckOut
//                 </Button>
//                 <FarmerDialog
//                     open={open}
//                     onClose={handleClose}
//                     handleSubmit={handleSubmit}
//                     dataname={dataname}
//                     dataid={dataid}
//                 />
//                 <CheckOutDialog
//                     checkopen={checkopen}
//                     handleOk={handleOk}
//                     orders={orders}
//                 />
//             </Container>
//             {/* <Box */}
//         </div >
//     )
// }
//
// export default FarmerDashBoard
// //https://medium.com/codex/how-to-use-array-in-reactjs-2a30d8b72503
// //https://stackoverflow.com/questions/57691920/how-to-push-an-object-in-array-field-using-firebase-db
// //https://stackoverflow.com/questions/48689876/how-to-convert-timestamp-in-react-js