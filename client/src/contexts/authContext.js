import { Flex, Spinner } from '@chakra-ui/react';
import {useState,createContext,useEffect,useContext} from 'react'
import { fetcMe, kullaniciCikis,fetchRefresh } from '../api';



const AuthContext = createContext();

const AuthProvider = ({children}) => {

    const [user , setUser] = useState(null);
    const [loggedIn , setLoggedIn] = useState(false);

    const [loading,setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const me = await fetcMe();
                
                if (me.mesaj !== "token yok" && me.mesaj !== "jwt expired") {
                console.log(me);
                setLoggedIn(true);
                setUser(me);
                setLoading(false);
                }
                if(me.mesaj === "jwt expired"){
                    const ref = await fetchRefresh();
                    console.log(ref);
                    setLoggedIn(true)
                    localStorage.setItem("refresh-token",ref.refreshToken);
                    localStorage.setItem("access-token",ref.token);
                    setUser(ref.data);
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
        console.log(data);
        localStorage.setItem('access-token', data.token);
        localStorage.setItem('refresh-token', data.refreshToken);
        localStorage.setItem('userid', data.user._id);
    }

    const logOut = async () => {
        setLoggedIn(false);
        setUser(null);
        await kullaniciCikis();

        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
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