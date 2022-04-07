import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app)

const App = () => {
    const [user,setUser]=useState({})

    const googleAuthprovider = new GoogleAuthProvider()
    const gitHubAuthProvider = new GithubAuthProvider()


    const handlegoogleSignIn = () =>{
        signInWithPopup(auth, googleAuthprovider)
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
    const handlegithubSignIn = () =>{
         signInWithPopup(auth, gitHubAuthProvider)
         .then(result=>{
             const user = result.user;
             console.log(user)
             setUser(user)
         })
         .catch(error=>{
             console.log(error)
         })
    }

    return (
        <div>
            {user.uid? <button onClick={handleSignOut}>google sign out</button>:
            <div>
                 <button onClick={handlegoogleSignIn}>google log in</button>
                 <button onClick={handlegithubSignIn}>git hub signin</button>
            </div>
              }
           
            
            <h2>name:{user.displayName}</h2>
            <img src={user.photoURL} alt="" />
            <p>email:{user.email}</p>
        </div>
    );
};

export default App;