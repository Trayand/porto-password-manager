import React, { useState } from 'react';
import { firebase } from '../config/firebase'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { Login } from '../store/actions/UserAction';

import { Form, Button } from 'react-bootstrap';
import '../style/index.css'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export default function FormForLogin(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const history = useHistory()
    const dispatch = useDispatch()

    const emailChangeHandler = e => {
        setEmail(e.target.value)
    }

    const passwordChangeHandler = e => {
        setPassword(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            let userData;
            if (props.intent === 'login') {
                userData = await firebase
                    .auth()
                    .signInWithEmailAndPassword(email, password)
            } else if (props.intent === "register") {
                userData = await firebase
                    .auth()
                    .createUserWithEmailAndPassword(email, password)
            }

            console.log(userData, 'ini userData');

            dispatch(Login({
                id: userData.user.uid
            }))

            history.push('/hello')


        } catch (error) {
            console.log(error, 'ini error')
            
            MySwal.fire({
                title: 'error',
                footer: 'Copyright 2018',
                onOpen: () => {
                    MySwal.clickConfirm()
                }
            }).then(() => {
                return MySwal.fire({
                    icon: 'error',
                    title: error.message,
                    showConfirmButton: false,
                    timer: 2000
                })
            })
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