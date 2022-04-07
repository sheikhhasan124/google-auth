import React, { useState } from 'react';
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


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
    {/* auth by input email password  */}
const handleEmailBlur = (e) =>{
    console.log(e.target.value)
}
const handlePasswordlBlur = (e) =>{
    console.log(e.target.value)
}
const handleFormSubmit = (e) =>{
    console.log('form submit')
    e.preventDefault()
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


{/* auth by input email password  */}
    <div className="resistration w-50 mx-auto">
        <h2 className="text-primary">plese resister</h2>
    <Form onSubmit={handleFormSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
    </div>
        </div>
    );
};

export default App;