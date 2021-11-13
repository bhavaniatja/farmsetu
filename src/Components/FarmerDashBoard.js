import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase"
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Toolbar, Typography, TextField, Alert, Container, Stack, FormHelperText } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import FarmerDialog from './FarmerDialog';
import Box from "@mui/material/Box";
function FarmerDashBoard() {
    const [products, setProducts] = useState([]);
    const [dataname, setDataName] = useState("");
    const [orders, setOrders] = useState([]);
    // const [quantity, setQuantity] = useState("");
    const [open, setOpen] = useState(false);
    const [user] = useAuthState(auth);
    const history = useHistory();
    const signOut = () => {
        auth.signOut();
        history.replace("/login");
    }
    useEffect(async () => {
        if (!user) {
            signOut();
        }
        let list = [];
        await firestore.collection('commodities').get().then(querySnapshot => {
            console.log('Total Commodities ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
                // setProducts({
                //     ...products,
                //     name: documentSnapshot.data()
                // });
                list.push(documentSnapshot.data());
            })
        });

        setProducts(list);
        console.log(products);
    }, [user]);
    const handleSubmit = (event, dataname, quantity, farmName) => {
        event.preventDefault();
        console.log(quantity);
        const timestamp = Date.now();
        if (quantity != "") {
            const namez = dataname;
            let newOrder = {
                name: namez, quantity: quantity,
                farmName: farmName,
                createdAt: new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(timestamp)
            }
            setOrders([...orders, newOrder]);
        }
        setOpen(false);
        console.log(orders);
    }
    const checkOut = async () => {
        let nn = JSON.parse(JSON.stringify(orders));
        console.log(nn);
        await firestore.collection('farmerorders').doc(user.uid)
            .update({
                orders: orders
            });
        setOrders("");
    }
    const handleClickOpen = (event, dataname) => {
        event.preventDefault();
        setDataName(dataname);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar variant="dense" style={{ backgroundColor: '#2E3B55', display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" color="inherit">
                            Jeevamrut
                        </Typography>
                        <Button variant='contained' color="secondary" onClick={signOut}>Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Alert severity="info" style={{ display: 'flex', justifyContent: 'center' }}>Confirm Your Produce for xx/xx/xx</Alert>
            <Container style={{ display: 'flex', justifyContent: 'center', marginTop: '20' }}>
                <Stack spacing={2}>
                    {products && products.map((data, key) => (
                        <Card style={{ minWidth: 300 }} key={key}>
                            <CardContent style={{ marginBottom: -20 }}>
                                <Typography variant="h5" component="div">
                                    {data.name}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ display: 'flex', flexDirection: 'column' }}>

                                <Button variant='contained' color="primary" onClick={(ev) => handleClickOpen(ev, data.name)} >Enter Quantity</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Stack>
            </Container>
            <Container style={{ position: 'fixed', bottom: 1, display: 'flex', alignItems: 'center' }}>
                <FarmerDialog
                    open={open}
                    onClose={handleClose}
                    handleSubmit={handleSubmit}
                    dataname={dataname}
                />
                <Button fullWidth={true} variant="contained" onClick={() => checkOut()}>CheckOut</Button>
            </Container>
        </div >
    )
}

export default FarmerDashBoard
//https://medium.com/codex/how-to-use-array-in-reactjs-2a30d8b72503
//https://stackoverflow.com/questions/57691920/how-to-push-an-object-in-array-field-using-firebase-db