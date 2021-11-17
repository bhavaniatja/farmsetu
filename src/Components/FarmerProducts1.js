import React, {useState, useEffect} from 'react';
import './App.css';
import {forwardRef} from 'react';
import Grid from '@material-ui/core/Grid'

import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import {auth, firestore} from "../firebase";
import Button from "@material-ui/core/Button";
import TextField from "@mui/material/TextField";
import {DatePicker, DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {useAuthState} from "react-firebase-hooks/auth";
import {useHistory} from "react-router-dom";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
};

// const api = axios.create({
//     baseURL: `https://reqres.in/api`
// })


function validateEmail(email) {
    const re = /^((?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\]))$/;
    return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    },
    toolbar: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: theme.spacing(2)
    },
    content: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    }
}));

function FarmerProducts1() {
    const classes = useStyles();

    const [user] = useAuthState(auth);
    const history = useHistory();
    const signOut = () => {
        auth.signOut().then()
        history.replace("/login");
    }

    let columns = [
        {title: "id", field: "id", hidden: false},
        {title: "Product Name", field: "productName", hidden: false},
        {title: "Quantity", field: "quantity", hidden: false},
        {title: "Price", field: "price", hidden: false},
        {title: "Variety", field: "variety", hidden: false},
        {title: "Source", field: "source", hidden: false}
    ]
    const [data, setData] = useState([]); //table data

    //for error handling
    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    let rows = [
        {id: 1, productName: "Oranges - Kgs", quantity: "", price: "", variety: "", source: "",},
        {id: 2, productName: "Spinach - Kgs", quantity: "", price: "", variety: "", source: "",},
        {id: 3, productName: "Fenugreek - Kgs", quantity: "", price: "", variety: "", source: "",}
    ];

    useEffect(async () => {
        if (!user) {
            signOut();
        }
        setData(rows);
    }, [user])

    let finalData = [];
    const checkOut = async () => {
        // let nn = JSON.parse(JSON.stringify(orders));
        console.log(finalData);
        await firestore.collection('farmerProducts').doc(user.uid)
            .set({
                products: finalData
            });
        setData(rows);
    }
    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        data.forEach(d => {
                if (d.id === newData.id) {
                    finalData.push(d);
                }
            }
        )
        const dataUpdate = [...data];
        const index = oldData.tableData.id;
        dataUpdate[index] = newData;
        setData([...dataUpdate]);
        resolve()

    }

    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <div className="App">
            <CssBaseline/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Jeevamrut
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container spacing={1}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <div>
                        {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                        }
                    </div>
                    <Grid container spacing={2} padding={8}>
                        <Grid item xs={6}>
                            <TextField
                                margin="normal"
                                required
                                id="farmName"
                                label="Farm Name"
                                name="farmName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <DatePicker
                                    label="Date&Time picker"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <MaterialTable
                        title="Products"
                        columns={columns}
                        data={data}
                        icons={tableIcons}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    handleRowUpdate(newData, oldData, resolve);
                                }),
                        }}
                    />
                    <Grid item xs={1}/>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={1}/>
                <Grid item xs={10}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="comments"
                        label="Comments"
                        name="comments"
                        autoFocus
                    />
                    <Button
                        variant={"outlined"}
                        color="primary"
                        onClick={checkOut}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default FarmerProducts1;