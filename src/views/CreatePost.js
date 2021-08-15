import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Header from "../components/Header";
import Container from "@material-ui/core/Container";
import { useSelector } from "react-redux";
import SignIn from "./SignIn";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: '5px auto',
            width: '25ch',
        },
    },
    container: {
        background: '#f5f6f9',
        borderRadius: '5px',
        padding: '24px'
    },
}));

export default function CreatePost() {
    const classes = useStyles();
    const passwordFill = useSelector((state) => state.checkUser.password);

    return passwordFill ? (
        <div>
            <Header>
                <Container className={classes.container} component="main" maxWidth="xl">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                        <TextField label="Outlined" variant="outlined" /><br/>
                    </form>
                </Container>
            </Header>
        </div>

    ): (
        <SignIn/>
    );
}
