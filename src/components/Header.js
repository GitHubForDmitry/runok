import React, {useContext} from 'react';
import './header.css';
import {useHistory} from 'react-router-dom';
import 'firebaseui/dist/firebaseui.css'
import firebase from "../firebase";
import {Button} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {AppContext} from "../context/AppWrapper";
import SearchProduct from "./Search";

function Header({children}) {

    let history = useHistory();
    const { currentUser, setCurrentUser } = useContext(AppContext);
    const createPost = () => {
        if (!currentUser) {
            history.push('/signup')
        } else {
            history.push('/createpost')
        }
    }

    const logIn = () => {
        history.push('/signin')
    }

    const logOut = () => {
        console.log('logout')
        firebase.auth().signOut().then(() => {
            localStorage.removeItem('user');
            console.log('logout2')
            alert(`Пользователь ${currentUser.email} вышел`)
            setCurrentUser(null);
            history.push('/signin')
        }).catch((error) => {
            // An error happened.
        });
    }

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
                        <div>
                            <div className="button--right">
                                <Button variant="contained" color="primary"  onClick={createPost}>
                                    Добавить обьявление
                                </Button>
                                <br/> <br/>
                                {currentUser ? (
                                    <Button variant="contained" color="primary"  onClick={logOut}>
                                        Выйти
                                    </Button>
                                ) : (
                                    <Button variant="contained" color="primary"  onClick={logIn}>
                                        Войти
                                    </Button>
                                )}

                            </div>
                        </div>

                        <div className="flex-center">
                            <SearchProduct />
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
