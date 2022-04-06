import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app)

const App = () => {
    const [user,setUser]=useState({})

    const provider = new GoogleAuthProvider()

    const handlegoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then(result=>{
            const user = result.user;
            setUser(user)
            console.log(user);
        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <button onClick={handlegoogleSignIn}>google log in</button>
            <h2>name:{user.displayName}</h2>
        </div>
    );
};

export default App;