import React, { useEffect, useState } from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase";
import AppBar from '@mui/material/AppBar';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from '@mui/material/Pagination';
import { Link, useParams } from 'react-router-dom';
import { Toolbar, Box, Button, Grid, Typography } from "@material-ui/core";
import { Item } from './Item';
import Picker from "./Picker";
import ArrowDownwardOutlinedIcon from '@material-ui/icons/ArrowDownwardOutlined';
function DetailOrderList(props) {
    let { id } = useParams();
    // const [rows, setRows] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [offSet, setOffSet] = useState(0);
    const [perPage, serPerPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    // const [vendorId, setVendorId] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const handlePageClick = async (event, value) => {

        setOffSet(value = value - 1 < 0 ? 0 : value - 1);
        console.log(offSet);
        await receivedData();
    };
    const receivedData = async () => {
        let vendorId;
        await firestore.collection('b2busers').get()
            .then(snapshot => {
                snapshot.docs.forEach(doc => {
                    if (doc.id == user.uid) {
                        vendorId = doc.data().vendorId;
                    }
                });
            });
        const apiUrl = `https://www.alfanzo.com:443/order/`
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "pageNumber": offSet,
                "pageSize": 40,
                "sortDirection": "asc",
                "sortByKey": "id",
                "startDate": startDate,
                "endDate": endDate
            })
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.json())
            .then(data => {
                // setRows(data.content);
                const filteredData = data.content.filter((data) => data.vendorId == vendorId);
                setFinalData(filteredData);
                setTotalPages(data.totalPages);
            });
        // console.log(rows, totalPages);
    }
    const [user] = useAuthState(auth);
    const history = useHistory();
    const signOut = async () => {
        await auth.signOut();
        history.replace("/login");
    }
    useEffect(async () => {
        if (!user) {
            console.log(user);
            history.replace("/");
        }
        receivedData();
    }, []);


    const handleButtonClick = () => {
        receivedData()
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
            <Typography component="h2" variant="h6" style={{ color: 'black', }} align={"left"} gutterBottom>
                Orders
            </Typography>
            <Grid container justifyContent="flex-end" component={Paper}>
                <div>
                    <Item />
                </div>
                <Picker dateChange={(e) => setStartDate(e.target.value)} label={"Start Date"} />
                <Picker dateChange={(e) => setEndDate(e.target.value)} label={"End Date"} />
                <Button variant={"contained"} color={"primary"} size={"small"} style={{ marginRight: "5px" }}
                    onClick={() => handleButtonClick()}>Show</Button>
            </Grid>
            <Box m={1} />
            <TableContainer component={Paper}>
                <Table className="table" aria-label="spanning table">
                    <TableHead style={{ backgroundColor: 'indianred', color: 'white', }}>
                        <TableRow>
                            {/*<TableCell style={{color: 'wheat'}}>Sl.No</TableCell>*/}
                            <TableCell style={{ color: 'wheat' }}>Order No</TableCell>
                            <TableCell style={{ color: 'wheat' }}>User Id</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Date</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Total</TableCell>
                            <TableCell align="center" style={{ color: 'wheat' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {finalData.map((row, index) => (
                            <TableRow key={row.id}>
                                {/*<TableCell align="left">{index + 1}</TableCell>*/}
                                <TableCell>
                                    <Link to={{
                                        pathname: '/detailorder/' + row.id,
                                        id: row.id
                                    }}>{row.id}</Link>
                                </TableCell>
                                <TableCell >{row.userId}</TableCell>
                                <TableCell align="center">{row.createdAt}</TableCell>
                                <TableCell align="center">{row.total}</TableCell>
                                <TableCell align="center">{row.deliveryStatus}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box m={2} />
            <Grid container justifyContent={"center"}>
                <Pagination variant={"text"} color={"primary"}
                    count={totalPages}
                    onChange={handlePageClick} />
            </Grid>
            <Box m={2} />
        </div>
    )
}

export default DetailOrderList
