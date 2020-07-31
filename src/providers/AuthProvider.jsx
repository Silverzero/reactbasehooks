import React from 'react'
import {getSession, getLogin, getRegister, getLogout} from '../utils/Api';

export const AuthContext = React.createContext()

const AuthProvider = (props) => {
    
    const initialSession         = {}
    const [session, setSession ] = React.useState(initialSession)
    
    const fetchLogin = (email, password) => {
        return getLogin(email, password).then( response => {
            localStorage.setItem('session', JSON.stringify(response))
            setSession(response)
        })
    }

    const fetchRegister = (email, firstname, lastname, redirect = undefined) => {
        return getRegister(email, firstname, lastname)
    }

    const fetchLogout = () => {
        return getLogout().then( () => {
            setSession(initialSession)
            //localStorage.removeItem('session')
        })
    }

    const checkSession = React.useCallback( async() => {
        if(session === initialSession){
            try{
                const response = await getSession()
                setSession(response)
            }catch( error ){
                setSession(initialSession)
            }

            return session
        }
    
    }, [initialSession, session])

    React.useEffect( () => {
        checkSession()
    }, [checkSession] )

    return (
        <AuthContext.Provider value={{
            session, initialSession, fetchLogin, fetchRegister, fetchLogout, checkSession
        }}>
           {props.children} 
        </AuthContext.Provider>
    )
}

export default AuthProvider