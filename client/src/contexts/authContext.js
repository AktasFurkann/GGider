import {useState,createContext,useEffect,useContext} from 'react'
import { fetcMe } from '../api';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loggedIn , setLoggedIn] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetcMe();
                
                setLoggedIn(true);
                setUser(me);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    const login = (data) => {
        setLoggedIn(true);
        setUser(data.user);

        localStorage.setItem('access-token', data.token);
    }

    const values = {
        loggedIn,
        user,
        login
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider , useAuth};