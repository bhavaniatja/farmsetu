import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../firebase"
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Toolbar, Typography, TextField, FormHelperText, Zoom } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
function Dashboard() {
  const [user] = useAuthState(auth);
  const [code, setCode] = useState("");
  const [checked, setChecked] = useState(false);
  const [coupons, setCoupons] = useState({});
  const [error, setError] = useState("");
  const history = useHistory();
  const signOut = () => {
    auth.signOut();
    history.replace("/");
  }
  const addToUser = async (code, id) => {
    // console.log(user.uid + " " + id);
    await firestore.collection('users').doc(user.uid).collection('coupons').doc(id).set({
      coupon: code,
    });
  }
  var x = 1;
  const checkValidity = async (code, id) => {
    await firestore.collection('users').doc(user.uid)
      .collection('coupons').get().then(querySnapshot => {
        console.log('Total Coupons: ', querySnapshot.size);
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data().coupon + " " + code);
          if (documentSnapshot.data().coupon == code) {
            x = 0;
            setError("You've already availed this " + code + " code");
            console.log("Yes");
          }
        })
      })
    if (x == 1) {
      addToUser(code, id);
      setError("You've availed " + code + " Successfully");
    }
  }
  const getCoupon = async () => {
    setError("");
    setChecked(false);
    await firestore
      .collection('coupons')
      .get()
      .then(querySnapshot => {
        console.log('Total Coupons: ', querySnapshot.size);

        querySnapshot.forEach(documentSnapshot => {
          // console.log('Code: ', documentSnapshot.id, documentSnapshot.data().code);
          if (code == documentSnapshot.data().code) {
            checkValidity(code, documentSnapshot.id);
          }
        });
      });
    setChecked(true);
    // console.log(coupons);
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
      <Box style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
        <Card>
          <CardContent style={{ marginBottom: -20 }}>
            <Typography variant="h5" component="div">
              Enter Your Coupon Code
            </Typography>
          </CardContent>
          <CardActions style={{ display: 'flex', flexDirection: 'column' }}>
            <TextField value={code}
              onChange={(e) => setCode(e.target.value)}
              variant="filled" color="success" margin="normal" />
            <Zoom in={checked}><FormHelperText id="component-error-text">{error == "" ? "Enter Correct Code" : error} </FormHelperText></Zoom>
            <Button variant='contained' color="primary" onClick={() => getCoupon()}>Claim!</Button>
          </CardActions>
        </Card>
      </Box>
    </div>
  )
}

export default Dashboard
