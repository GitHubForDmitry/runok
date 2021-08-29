import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../components/Header";
import firebase from "../firebase";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import {checkPassword} from "../store/features/auth";
import SimpleModal from "../components/Modal";
import Notify from "../components/Notify";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let history = useHistory();
    const dispatch = useDispatch();
    const submitWithEmailAndPassword = (e) => {
        console.log(email, password)
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
            dispatch(checkPassword(true))
            history.push('/createpost')
        })
            .catch(function(error) {
                dispatch(checkPassword(false))
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorMessage === 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                    setErrorMessage('Нет такого пользователя, зарегестрируйтесь')
                }
                if (errorCode === 'auth/user-not-found') {
                    setErrorMessage('Пользователь не найден')
                }
                if (errorCode === 'auth/wrong-password') {
                    setErrorMessage('Не правильный пароль');
                }
                console.log(error);
            });
    }
    return (
        <Header>
            <Notify message={errorMessage} openNotify={!!errorMessage} severity="error" />
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Войти
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitWithEmailAndPassword}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="+380"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value + '@runok.com') }
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Ваш пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Запоминть меня"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Войти
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <SimpleModal />
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2" >
                                {"Не зарегистрирован? Зарегистрируйся"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
        </Header>
    );
}
