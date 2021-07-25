import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from "../components/Header";
import firebase from '../firebase';
import * as firebaseui from "../../node_modules/firebaseui/dist/npm__ru.js";

const useStyles = makeStyles((theme) => ({
    container: {
        background: '#fff',
        borderRadius: '5px',
        padding: '24px',
    }
}));

export default function SignUp() {
    const classes = useStyles();
    const [userExist, setUserExist] = useState(false)
    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log(user)
            } else {
                console.log()
            }
        });
    }, [])

    const authWithEmail = (email, password) => {
        firebase.auth().createUserWithEmailAndPassword(email , password = 123456)
            .then((userCredential) => {
                var user = userCredential.user;
                if (user) {
                    setUserExist(true)
                } else {
                    setUserExist(false)
                }
                // ...
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
            });
    }

    React.useEffect(() => {
        const uiConfig = {
            signInOptions: [{
                provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
                recaptchaParameters: {
                    type: 'image',
                    size: 'normal',
                    badge: 'bottomleft'
                },
                defaultCountry: 'UA'
            }],
            callbacks: {
                signInSuccessWithAuthResult: async (authResult, redirectUrl) => {
                    console.log(authResult.user.phoneNumber, 'authresult')
                    authWithEmail(authResult.user.phoneNumber + '@runok.com');
                    authResult.user.getIdTokenResult().then(tokenResult => {
                        console.log(tokenResult)
                    });
                    return userExist;
                }
            },
            signInSuccessUrl: userExist ? null : "/signuppassword",
        };

        if (firebaseui.auth.AuthUI.getInstance()) {
            const ui = firebaseui.auth.AuthUI.getInstance()
            ui.start('#firebaseui-auth-container', uiConfig)
        } else {
            const ui = new firebaseui.auth.AuthUI(firebase.auth())
            ui.start('#firebaseui-auth-container', uiConfig)
        }

    }, [])

        return (
            <div>
                <Header>
                    <Container className={classes.container} component="main" maxWidth="xs">
                        <div id="firebaseui-auth-container" />
                    </Container>
                </Header>
            </div>
        )

}
