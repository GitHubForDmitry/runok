import React from 'react';
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
import firebase from '../firebase';

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
    },
}));

export default function SignUp() {
    const classes = useStyles();

    const [number, setNumber] = React.useState('+380505670898')

    const window = {
        recaptchaVerifier: undefined
    };

    function onChangeHandler(event){
        const { name, value } = event.target;
        setNumber(value)
    };
    function onSignInSubmit(e) {
        e.preventDefault();
        setUpRecaptcha();
        const phoneNumber = number;
        console.log(phoneNumber)
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;

                const code = window.prompt('enter code');
                confirmationResult.confirm(code).then((result) => {
                    // User signed in successfully.
                    const user = result.user;
                    console.log(result)
                    console.log(user)
                    // ...
                }).catch((error) => {
                    // User couldn't sign in (bad verification code?)
                    // ...
                });
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
        });
    }
    function setUpRecaptcha() {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': (response) => {
                console.log('recaptcha solved')
                onSignInSubmit();
            }
        });
        // [END auth_phone_recaptcha_verifier_invisible]
    }

    function onSubmitOtp(e) {
        e.preventDefault();
        let otpInput = number;
        let optConfirm = window.confirmationResult;
        // console.log(codee);
        optConfirm
            .confirm(otpInput)
            .then(function (result) {
                // User signed in successfully.
                // console.log("Result" + result.verificationID);
                let user = result.user;
                console.log(user)
            })
            .catch(function (error) {
                console.log(error);
                alert("Incorrect OTP");
            });
    };

    function recaptchaVerifierVisible() {
        // [START auth_phone_recaptcha_verifier_visible]
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
            }
        });
        // [END auth_phone_recaptcha_verifier_visible]
    }

    function recaptchaVerifierSimple() {
        // [START auth_phone_recaptcha_verifier_simple]
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
        // [END auth_phone_recaptcha_verifier_simple]
    }

    function recaptchaRender() {
        /** @type {firebase.auth.RecaptchaVerifier} */
        const recaptchaVerifier = window.recaptchaVerifier;

        // [START auth_phone_recaptcha_render]
        recaptchaVerifier.render().then((widgetId) => {
            window.recaptchaWidgetId = widgetId;
        });
        // [END auth_phone_recaptcha_render]
    }

    function phoneSignIn() {
        function getPhoneNumberFromUserInput() {
            return "+15558675309";
        }

        // [START auth_phone_signin]
        const phoneNumber = getPhoneNumberFromUserInput();
        const appVerifier = window.recaptchaVerifier;
        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                window.confirmationResult = confirmationResult;
                // ...
            }).catch((error) => {
            // Error; SMS not sent
            // ...
        });
        // [END auth_phone_signin]
    }

    function verifyCode() {
        function getCodeFromUserInput() {
            return "1234";
        }

        /** @type {firebase.auth.ConfirmationResult} */
        const confirmationResult = undefined;

        // [START auth_phone_verify_code]
        const code = getCodeFromUserInput();
        confirmationResult.confirm(code).then((result) => {
            // User signed in successfully.
            const user = result.user;
            // ...
        }).catch((error) => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
        // [END auth_phone_verify_code]
    }

    function getRecaptchaResponse() {
        const recaptchaWidgetId = "...";
        const grecaptcha = {};

        // [START auth_get_recaptcha_response]
        const recaptchaResponse = grecaptcha.getResponse(recaptchaWidgetId);
        // [END auth_get_recaptcha_response]
    }
    return (
        <div>
            <Header>
                <Container className={classes.container} component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <form className={classes.form} onSubmit={onSignInSubmit}
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
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                                    label="I want to receive inspiration, marketing promotions and updates via email."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            type="submit"
                            // onClick={e => e.preventDefault()}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="#" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                    <form onSubmit={onSubmitOtp}>
                        <input type="text" onChange={onChangeHandler}/>
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
