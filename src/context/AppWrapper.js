import React, { useEffect, useState } from "react";
import firebase from '../firebase';
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);


    const loadUser = () => {
        setLoadingUser(true);
        // if (sessionStorage.getItem('user')) {
        //     setCurrentUser(sessionStorage.getItem('user'));
        //     return;
        // }
        try {
            firebase.auth().onAuthStateChanged((user) => {

                if (user !== null) {
                    // sessionStorage.setItem('user', JSON.stringify(user.providerData[0]));
                    setCurrentUser(user)
                    setLoadingUser(false);
                } else {
                    setLoadingUser(false);
                }
            });
        } catch (e) {
            console.log(e, 'error loading user')
        }
        finally {
        }
    }

    useEffect(() => {
        loadUser()
    }, []);

    useEffect(() => {
        console.log('currentUser', currentUser)
    }, [currentUser])
    return (
        <AppContext.Provider
            value={{
                currentUser,
                loadingUser,
                setCurrentUser
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;

export { AppProvider };
