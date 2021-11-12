import React, { useState, useEffect } from 'react'
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
function JeevamrutCheck({ loading, finalpush, handleSubmit }) {
    console.log(loading);
    console.log(finalpush);
    return (
        <div>
            {loading &&
                <Container style={{ display: 'flex' }}>
                    {finalpush && finalpush.map((finpush, key) => (
                        <Card style={{ minWidth: 300, margin: 20 }} key={key}>
                            <CardContent style={{ marginBottom: -20 }}>
                                <Typography variant="h5" component="div">
                                    {finpush.name}
                                </Typography>
                                <TableContainer component={Paper}>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Commodity</TableCell>
                                                <TableCell align="right">Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {finpush.orders.map((finpushorders, key) => (
                                            <TableBody key={key}>
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        {finpushorders.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {finpushorders.quantity}
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        ))}
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
                                <Button variant='contained' color="primary" onClick={(ev) => handleSubmit(ev)} >Submit</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Container>}
        </div>
    )
}

export default JeevamrutCheck
