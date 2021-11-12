import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { auth, signInWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Box from "@mui/material/Box";
import "./Login.css"
import { TextField } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (user) {
      history.push("/dashboard");
      console.log(JSON.stringify(user.uid));
    }
  }, [user]);
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense" style={{ backgroundColor: '#2E3B55' }}>
            <Typography variant="h6" color="inherit">
              Jeevamrut
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Box className="login">
        <Card className="login__container">
          <CardContent className="cardcontent">
            <TextField margin="dense" fullWidth
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <TextField fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </CardContent>
          <CardActions className="actions" style={{ display: 'flex', flexDirection: 'column' }}>
            <Button variant="contained"
              onClick={() => signInWithEmailAndPassword(email, password)}
            >
              Login
            </Button>
            <div>
              <Link to="/register">SignUp</Link>
            </div>
            <div>
              <Link to="/reset">Forgot Password</Link>
            </div>
          </CardActions>
        </Card>
      </Box>
    </div>
  );
}
export default Login;