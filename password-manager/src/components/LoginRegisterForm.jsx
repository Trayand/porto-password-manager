import React, { useState } from 'react';
import {firebase} from '../config/firebase'

import { Form, Button } from 'react-bootstrap';
import '../style/index.css'


export default function FormForLogin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emailChangeHandler = e => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = e => {
        setPassword(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        console.log(props.intent)
        try {
            let userData;
            if (props.intent === 'login') {
                userData = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
                    console.log(userData, 'ini data');
                } else if (props.intent === "register") {
                    userData = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
                    console.log(userData, 'ini register');
            }
            console.log('=================');
            console.log(userData, 'ini user');
            console.log('=================');
            
            
        } catch (error) {
            console.log('=================');
            console.log(error, 'ini error')
            console.log('=================');
        }
    }


    return (
        <Form style={{ width: '35vw', marginTop: -60 }} onSubmit={handleForm} >
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={emailChangeHandler} value={email} />
                {
                    props.intent === 'login'
                        ? <Form.Text className="text-muted" style={{ width: '100%' }} >Welcome Back</Form.Text>
                        : <Form.Text className="text-muted" style={{ width: '100%' }} >We'll never share your email with anyone else.</Form.Text>
                }
            </Form.Group>

            <Form.Group controlId="formBasicPassword" style={{ marginBottom: 60 }} >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={passwordChangeHandler} value={password} />
            </Form.Group>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {
                    props.intent === 'register'
                        ? <Button variant="info" type="submit" name="submit" value="register" style={{ width: 100 }} >Register</Button>
                        : <span style={{ width: 100 }} ></span>
                }
                {
                    props.intent === 'login'
                        ? <Button variant="success" type="submit" name="submit" value="login" style={{ width: 100 }} >Login</Button>
                        : <span style={{ width: 100 }} ></span>
                }
            </div>
        </Form>
    )
}