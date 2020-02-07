import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import Form from './LoginRegisterForm';
import '../style/index.css'
import selectingImage from '../assets/select.svg'
import ideaImage from '../assets/idea.svg'
import {useSelector} from 'react-redux'

export default function LoginPage(porps) {
    const [imageState, setImageState] = useState(ideaImage)
    const [formSet, setFormSet] = useState('Login')
    const [intent, setIntent] = useState('login')

    const history = useHistory()

    const changeImage = () => {
        if (intent === "register") {
            setImageState(ideaImage)
            setFormSet('Login')
        } else {
            setImageState(selectingImage)
            setFormSet('Register')
        }
    }

    const user = useSelector(state => state.user)

    useEffect(() =>{
        console.log(user, 'ini user dari auth.jsx');
        if(user) history.replace('/hello')
    },[user, history])
    

    return (
        <div className="login-holder">
            <div style={{ width: '50vw' }} >
                <img src={imageState} style={{ width: '50%', height: '450px', marginTop: -170, marginBottom: 90 }} alt="" />
                <h5>Just remember your master password and 'I' remembers the rest.<br />See for yourself how easy password management can be.</h5>
            </div>
            <div style={{ marginTop: -60 }} >
                <h3 style={{ textDecoration: 'underline' }} >{formSet}</h3>
                <br /><br />
                <Form style={{ width: '50vw' }} intent={intent} setImage={changeImage} />
                <Button className="btn-focus" variant="outline-warning" type="button" style={{ width: 212, marginTop: -80 }} onClick={() => {
                    setIntent(intent => {
                        if (intent === 'login') return 'register'
                        else return 'login'
                    })
                    changeImage()
                }}>
                    {
                        intent === 'register'
                            ? "Already have an account?"
                            : "Doesn't have any account?"
                    }
                </Button>
            </div>
        </div>
    )
}