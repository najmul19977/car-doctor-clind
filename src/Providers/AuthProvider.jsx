import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import app from '../firebase/firebase.confige';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading,setLoding] = useState(true);

    const createUser =(email,password) =>{
        setLoding(true);

        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signIn = (email,password) =>{
        setLoding(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            console.log('current user',currentUser);
            setLoding(false);
        });
        return()=>{
            return unsubscribe();
        }
    })
    const authInfo = {
        user,
        loading,
        createUser,
        signIn

    }
    return (
      <AuthContext.Provider value={authInfo}>
        {children}

      </AuthContext.Provider>
    );
};

export default AuthProvider;