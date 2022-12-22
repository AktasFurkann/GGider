import { Flex, Spinner } from '@chakra-ui/react';
import {useState,createContext,useEffect,useContext} from 'react'
import { fetcMe, kullaniciCikis } from '../api';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    const [loggedIn , setLoggedIn] = useState(false);

    const [loading,setLoading] = useState(true);
    console.log(user);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetcMe();
                console.log("me",me);
                if (me !== "token yok") {
                    setLoggedIn(true);
                setUser(me);
                setLoading(false);
                }
                setLoading(false);

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        })()
    }, [])

    const login = (data) => {
        setLoading(false);
        setLoggedIn(true);
        setUser(data.user);
        localStorage.setItem('access-token', data.token);
        localStorage.setItem('userid', data.user._id);
    }

    const logOut = async () => {
        setLoggedIn(false);
        setUser(null);
        await kullaniciCikis();

        localStorage.removeItem('access-token');
        localStorage.removeItem('userid');
      }

    const values = {
        loggedIn,
        user,
        login,
        logOut
    }

    if (loading) {
        return(
            <Flex justifyContent="center" alignItems="center" height="100vh" >
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='red.500'/>
            </Flex>
        )
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

const UseAuth = () => useContext(AuthContext);

export {AuthProvider , UseAuth};