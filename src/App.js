import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from './firebase.init';

const auth = getAuth(app)

const App = () => {
    const provider = new GoogleAuthProvider()

    const handlegoogleSignIn = () =>{
        signInWithPopup(auth, provider)
        .then(result=>{
            const user = result.user;
            console.log(user)

        })
        .catch(error=>{
            console.log(error)
        })
    }

    return (
        <div>
            <button onClick={handlegoogleSignIn}>log in</button>
        </div>
    );
};

export default App;