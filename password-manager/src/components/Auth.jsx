import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

import Form from './LoginRegisterForm';
import '../style/index.css'
import selectingImage from '../assets/select.svg'
import ideaImage from '../assets/idea.svg'

export default function LoginPage(porps) {
    const [imageState, setImageState] = useState(ideaImage)
    const [formSet, setFormSet] = useState('Login Here')
    const [intent, setIntent] = useState('login')

    const changeImage = (data) => {
        if (data === 'idea') {
            setImageState(ideaImage)
            setFormSet('Login Here')
        } else {
            setImageState(selectingImage)
            setFormSet('Register Here')
        }
    }

    return (
        <div className="login-holder">
            <div style={{ width: '50vw' }} >
                <img src={imageState} style={{ width: '50%', height: '450px', marginTop: -170, marginBottom: 90 }} alt="" />
                <h5>Just remember your master password and 'I' remembers the rest.<br />See for yourself how easy password management can be.</h5>
            </div>
            <div style={{marginTop: -60}} >
                <h3 style={{textDecoration: 'underline'}} >{formSet}</h3>
                <br/><br/>
                <Form style={{ width: '50vw' }} intent={intent} setImage={changeImage} />
                <Button className="btn-focus" variant="outline-warning" type="button" style={{ width: 212, marginTop: -80 }} onClick={() => {
                    setIntent(intent => {
                        if (intent === 'login') return 'register'
                        else return 'login'
                    })
                }}>
                    {
                        intent === 'register'
                            ? "Doesn't have any account? 'click me'"
                            : "Already have an account? 'click me'"
                    }
                </Button>
            </div>
        </div>
    )
}