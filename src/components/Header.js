import React, { useState, useEffect } from 'react';
import './header.css';
import {useHistory} from 'react-router-dom';
import 'firebaseui/dist/firebaseui.css'
import firebase from "../firebase";
import {Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";

function Header({children}) {

    let history = useHistory();
    const [currentUser, setCurrentUser] = useState(null);
    const goToSignUp = () => {
        history.push('/signup')
    }

    useEffect(() => {
        setCurrentUser(localStorage.getItem('current_user'))
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                setCurrentUser(user)
            } else {
                console.log('user not found')
            }
        });
        console.log(localStorage.getItem('current_user'))
        console.log(currentUser)
    }, [])
    return (
        <div className="wrapper">
            <div className="top">
                <Container component="main" maxWidth="xl">
                    <div className="container">
                        <div className="text-center">
                            <h1>
                            <span className="trademark">
                                <span
                                    className="trademark--text"
                                >РынOK</span>
                                <span className="trademark trademark--text"
                                >Украины ®</span>
                            </span>
                            </h1>
                            <span
                                className="trademark--text">
                                Ищи что угодно, когда угодно</span>
                        </div>
                        <div className="flex flex--between mb-2">
                            {currentUser !== null && currentUser.email}
                            {currentUser
                                ? (
                                    <div className="button--right">
                                        <Button variant="contained" color="primary">
                                            Добавить обьявление
                                        </Button>
                                    </div>
                                ) :
                                (
                                    <div className="button--right">
                                        <Button variant="contained" color="primary" onClick={goToSignUp}>
                                            Добавить обьявление
                                        </Button>
                                    </div>
                                )
                            }
                        </div>

                        <div className="d-flex justify-content-center mb-4">
                            <form className="form-inline">
                                <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                       aria-label="Search"/>
                            </form>
                        </div>
                    </div>
                    <svg viewBox="0 0 1440 120" className="wave">
                        <path
                            d="M1440,21.2101911 L1440,120 L0,120 L0,21.2101911 C120,35.0700637 240,42 360,42 C480,42 600,35.0700637 720,21.2101911 C808.32779,12.416393 874.573633,6.87702029 918.737528,4.59207306 C972.491685,1.8109458 1026.24584,0.420382166 1080,0.420382166 C1200,0.420382166 1320,7.35031847 1440,21.2101911 Z"></path>
                    </svg>
                </Container>
            </div>
            {children}
        </div>
    );
}

export default Header;
