import React, { useEffect, useState } from "react";
import firebase from '../firebase';
export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);


    const loadUser = () => {
        setLoadingUser(true);
        console.log(loadingUser, 'loadingUser')
        try {
            firebase.auth().onAuthStateChanged((user) => {
                if (user !== null) {
                    console.log('user found');
                    setCurrentUser(user)
                    setLoadingUser(false);
                } else {
                    console.log('user not found');
                    setLoadingUser(false);
                    console.log(currentUser)
                }
            });
        } catch (e) {
            console.log(e, 'error loading user')
        }
        finally {
            console.log(loadingUser, 2)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])
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
