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
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import JeevamrutCheck from './JeevamrutCheck';
export default function JeevamrutDashBoard() {
    const [user] = useAuthState(auth);
    const history = useHistory();
    const [username, setUserName] = useState("");
    const [ordersdata, setOrdersData] = useState([]);
    let [loading, setLoading] = useState(false);
    let [finalpush, setFinalPush] = useState([]);
    const signOut = () => {
        auth.signOut();
        history.replace("/");
    }
    let x = 0;
    // let finalpush = [];
    const happyCall = async (orderpush, dname) => {
        // console.log(orderpush);
        // console.log(dname);
        // let newOrder = { name: dname, orders: orderpush };
        // finalpush.push(newOrder);
        // setFinalPush(finalpush);
        // console.log(finalpush);
    }
    let lastpush = [];
    const pushOrders = async (id, displayName) => {
        // console.log(id);
        let orderpush = [];
        // setUserName(displayName);
        await firestore.collection('users').doc(id).collection('orders')
            .doc('order').get().then(snapshot => {
                snapshot.data().orders.forEach(ord => {
                    console.log(ord.name + " " + ord.quantity);
                    let newOrder = { name: ord.name, quantity: ord.quantity };
                    orderpush.push(newOrder);
                })
            }).then(function () {
                // console.log(orderpush);
                // console.log(displayName);
                let ordvar = { name: displayName, orders: orderpush };
                lastpush.push(ordvar);
                console.log(ordvar);
                setLoading(true);
                // finalpush.push(ordvar);
                // happyCall(orderpush, displayName);
            })
    }
    const triggerFirst = async () => {
        await firestore.collection('users').get()
            .then(snapshot => {
                snapshot.docs.forEach(user => {
                    // console.log(user.data().displayName);
                    let displayName = user.data().displayName;
                    pushOrders(user.id, displayName);
                })
                setFinalPush(lastpush);
            })
    }
    useEffect(async () => {
        setFinalPush("");
        await triggerFirst();
        console.log(finalpush);
    }, []);
    const handleSubmit = (event) => {
        // console.log(username);
        // console.log(ordersdata);
        console.log(finalpush);
    }
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
            <JeevamrutCheck loading={loading} finalpush={finalpush} handleSubmit={handleSubmit} />
        </div>
    )
}
