import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
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
    const handleSignOut=()=>{
        signOut(auth)
        .then(()=>{
            setUser({})
        })
        .catch(error=>{
            setUser({})
        })
    }

    return (
        <div>
            <button onClick={handlegoogleSignIn}>google log in</button>
            <button onClick={handleSignOut}>google sign out</button>
            <h2>name:{user.displayName}</h2>
            <img src={user.photoURL} alt="" />
            <p>email:{user.email}</p>
        </div>
    );
};

export default App;