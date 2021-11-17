import * as React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import AppBar from "@material-ui/core/AppBar";
import {DataGrid} from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {useState} from "react";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import {DateTimePicker} from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import {Grid} from "@material-ui/core";


const columns = [
    {field: "id", headerName: "ID", width: 90},
    {
        field: "productName",
        headerName: "Product",
        description: "This column has a value getter and is not sortable.",
        sortable: false,
        width: 160
    },
    {
        field: "quantity",
        headerName: "Quantity",
        width: 150,
        editable: true
    },
    {
        field: "price",
        headerName: "Price",
        width: 150,
        editable: true
    },
    {
        field: "variety",
        headerName: "Variety",
        width: 150,
        editable: true
    },
    {
        field: "source",
        headerName: "Source",
        width: 150,
        editable: true
    }

];

const rows = [
    {id: 1, productName: "Oranges - Kgs", quantity: ""},
    {id: 2, productName: "Spinach - Kgs", quantity: ""},
    {id: 3, productName: "Fenu Greek - Kgs", quantity: ""},
    {id: 4, productName: "Little Gourd - Kgs", quantity: ""},
    {id: 5, productName: "Bottle Gourd - Kgs", quantity: ""}
];

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


export default function FarmerProducts() {
    const classes = useStyles();
    const [value, setValue] = React.useState(new Date());

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    console.log(rows);

    return (
        <div className={classes.root}>
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

            <Paper className={classes.content}>
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
                            <DateTimePicker
                                label="Date&Time picker"
                                value={value}
                                onChange={handleChange}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </MuiPickersUtilsProvider>
                    </Grid>
                </Grid>
                <div className={classes.toolbar}>
                    <Typography variant="h6" component="h2" color="primary">
                        Farm Produce
                    </Typography>
                </div>
                <div style={{height: 400, width: "100%"}}>
                    <DataGrid rows={rows} columns={columns} />
                </div>
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
                </Grid>
                <Button
                    variant={"outlined"}
                    color="primary">
                    Submit
                </Button>
            </Paper>
        </div>
    );
}
