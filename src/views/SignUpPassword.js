import React from 'react';
import firebase from '../firebase';
import Header from "../components/Header";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Notify from "../components/Notify";
import { useDispatch } from 'react-redux'
import { checkPassword } from '../store/features/auth'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="runok.com.ua/copyright">
                runok.com.ua
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
const useStyles = makeStyles((theme) => ({
    container: {
        background: '#fff',
        borderRadius: '5px',
        padding: '24px',
    },
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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));
function SignUpPassword() {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    let history = useHistory();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user.phoneNumber !== null) {
                setEmail(user.phoneNumber)
            } else if (user.email) {
                setEmail(user.email.slice(0, user.email.indexOf('@')))
            } else {
                history.push('/signup')
            }
        });
    }, [])

    const changePassword = (e) => setPassword(e.target.value)

    const sendEmailAndPassword = (e) => {
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(email + '@runok.com', password)
            .then((userCredential) => {
                dispatch(checkPassword(true))
                localStorage.setItem('current_user', JSON.stringify(userCredential.user.providerData))
                history.push('/')
        })
            .catch((error) => {
                dispatch(checkPassword(false))
                const errorMessage = error.message;
                if (errorMessage === 'Password should be at least 6 characters') {
                    setErrorMessage('Пароль должен быть не менее 6 символов');
                } else if (errorMessage === 'The email address is already in use by another account.') {
                    setErrorMessage('Вы уже регестрировались, вспомните пароль или обратитесь в техподдержку');
                }
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000)
            });
    }

    return (
        <div>
            <Notify message={errorMessage} openNotify={!!errorMessage} severity="error" />
            <Header>
                <Container className={classes.container} component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Вы зарегистрировали телефон, добавьте пароль, который можно легко запомнить
                        </Typography>
                        <form className={classes.form}
                        >
                            <div id="recaptcha-container"/>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        type="text"
                                        inputProps={{pattern: "[\\+]\\d{2}\\d{3}\\d{3}\\d{2}\\d{2}"}}
                                        id="phone"
                                        label="Ваш телефон"
                                        name="phone"
                                        autoComplete="phone"
                                        chrome-autocomplete="off"
                                        placeholder="+38"
                                        minLength="13"
                                        maxLength="13"
                                        value={email}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Придумайте пароль"
                                        type="password"
                                        id="password"
                                        value={password}
                                        autoComplete="current-password"
                                        onChange={changePassword}
                                    />
                                </Grid>
                                {/*<Grid item xs={12}>*/}
                                {/*    <FormControlLabel*/}
                                {/*        control={<Checkbox value="allowExtraEmails" color="primary" />}*/}
                                {/*        label="I want to receive inspiration, marketing promotions and updates via email."*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={sendEmailAndPassword}
                                disabled={!password.length}
                                type="submit"
                            >
                                Зарегистрируйся
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Уже регестрировались? Войдите
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </Container>
            </Header>
        </div>
    );
}

export default SignUpPassword;
