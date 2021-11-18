import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';
import { auth, firestore } from "../firebase"
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Toolbar, Typography, TextField, Alert, Container, Stack, FormHelperText, Hidden } from '@mui/material';
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
import { Grid } from '@mui/material';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
export default function JeevamrutDashBoard() {
    const [user] = useAuthState(auth);
    const history = useHistory();
    // const [username, setUserName] = useState("");
    const [ordersdata, setOrdersData] = useState([]);
    const [dummy, setDummy] = useState(false);
    let [loading, setLoading] = useState(false);
    const [finalpush, setFinalPush] = useState([]);
    const signOut = () => {
        auth.signOut();
        history.replace("/login");
    }
    let lastpush = [];
    let username = "";
    const pushName = async (uid, orderspush) => {
        await firestore.collection('users').get().then(querySnapshot => {
            console.log('Users ', querySnapshot.size);
            querySnapshot.forEach(documentSnapshot => {
                console.log(uid);
                // console.log(documentSnapshot.uid);
                if (documentSnapshot.id == uid) {
                    username = documentSnapshot.data().displayName;
                    console.log(username);
                    let lpush = { name: username, orders: orderspush[0] };
                    console.log(lpush);
                    setFinalPush((prev) => [...prev, lpush]);
                    console.log(finalpush);
                }

            })
        });
    }
    useEffect(async () => {
        const unsubscribe = await firestore.collection('farmerorders').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    // console.log(doc.id);
                    let orderspush = [];
                    console.log(doc.data());
                    // if (doc.data().orders[0].name != "") {

                    orderspush.push(doc.data().orders);
                    if (doc.data().orders[0].farmname != "") {
                        pushName(doc.id, orderspush);
                    }
                })
                // setFinalPush(lastpush);
                console.log(finalpush);
                setLoading(true);
            })
        return unsubscribe;
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
                        <Link style={{ color: "white" }} to="/b2borders">B2B Orders</Link>
                        <ReactHTMLTableToExcel
                            id="test-table-xls-button"
                            className="download-table-xls-button"
                            table="table-to-xls"
                            filename="tablexls"
                            sheet="tablexls"
                            buttonText="Download as XLS" />
                    </Toolbar>
                </AppBar>
            </Box>
            <table id="table-to-xls" style={{ display: 'none' }}>
                <tr>
                    <th>Farmer Name</th>
                    <th>Commodity</th>
                    <th>Farm Name</th>
                    <th>Quantity</th>
                    <th>Harvest Period</th>
                    <th>Price</th>
                    <th>Variety</th>
                    <th>Source</th>
                    <th>Comments</th>
                    <th>Created At</th>
                </tr>
                {finalpush && finalpush.map((finpush, key) => (
                    <tr key={key}>
                        {finpush.orders.map((finpushorders, key) => (
                            <React.Fragment>
                                <td>{finpush.name}</td>
                                <td>{finpushorders.name}</td>
                                <td>{finpushorders.farmname}</td>
                                <td>{finpushorders.quantity}</td>
                                <td>{finpushorders.harvestperiod}</td>
                                <td>{finpushorders.price}</td>
                                <td>{finpushorders.variety}</td>
                                <td>{finpushorders.source}</td>
                                <td>{finpushorders.comments}</td>
                                <td>{finpushorders.createdAt.toString()}</td>
                            </React.Fragment>
                        ))}
                    </tr>
                ))}
            </table>
        </div>
    )
}
