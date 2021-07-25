import React from 'react';
import './header.css';
import {useHistory} from 'react-router-dom';
import 'firebaseui/dist/firebaseui.css'

function Header({children}) {

    let history = useHistory();
    const goToSignUp = () => {
        history.push('/signup')
    }

    return (
        <div className="wrapper">
            <div className="top">
                <div className="container" >
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
                    <div className="button--right">
                        <button className="btn btn-danger">
                            Добавить обьявление
                        </button>
                    </div>
                    <div className="button--left">
                        <button className="btn btn-success" onClick={goToSignUp}>
                            Register
                        </button>
                    </div>
                    <div className="d-flex justify-content-center mb-4">
                        <form className="form-inline">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search"
                                   aria-label="Search" />
                        </form>
                    </div>
                </div>
                <svg viewBox="0 0 1440 120" className="wave">
                    <path
                        d="M1440,21.2101911 L1440,120 L0,120 L0,21.2101911 C120,35.0700637 240,42 360,42 C480,42 600,35.0700637 720,21.2101911 C808.32779,12.416393 874.573633,6.87702029 918.737528,4.59207306 C972.491685,1.8109458 1026.24584,0.420382166 1080,0.420382166 C1200,0.420382166 1320,7.35031847 1440,21.2101911 Z"></path>
                </svg>
            </div>
            {children}
        </div>
    );
}

export default Header;
