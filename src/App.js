import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import app from './firebase.init';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


const auth = getAuth(app)

const App = () => {
//    auth by form email password 
const [email, setEmail]= useState('')
const [password, setPassword] = useState('')

    // auth by google github 
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
    {/* auth by input email password form */}
const handleEmailBlure = (e) =>{
    setEmail(e.target.value)
}
const handlePasswordBlure = (e) =>{
    setPassword(e.target.value)
}
const handleFormSubmit = (e) =>{
   createUserWithEmailAndPassword(auth, email, password)
   .then(result=>{
       const user = result.user;
       console.log(user)
   })
   .catch(error=>{
       console.error(error)
   })


    e.preventDefault()
}
    return (
    //    auth by google 
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


{/* auth by input email password form */}
    <div className="resistration w-50 mx-auto">
        <h2 className="text-primary">plese resister</h2>
    <Form onSubmit={handleFormSubmit}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control onBlur={handleEmailBlure} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control  onBlur={handlePasswordBlure} type="password" placeholder="Password" />
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