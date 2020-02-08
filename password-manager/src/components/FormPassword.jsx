import React, { useState } from 'react';

import { Form, Button, InputGroup } from 'react-bootstrap';

export default function FormPassword(props) {

    const [inputType, setInputType] = useState('password')
    const [eyeLogo, setEyeLogo] = useState('fa fa-eye-slash')
    const [validated, setValidated] = useState(false);

    const handleSubmit = event => {
        event.preventDefault()
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation();
            setValidated(true);
        }
    };

    const handleShowPassword = () => {
        // console.log('test');
        if (inputType === 'password') {
            setInputType('text')
            setEyeLogo('fa fa-eye')
        } else {
            setInputType('password')
            setEyeLogo('fa fa-eye-slash')
        }
    }


    return (
        <>
            <div className="w-75 mx-auto my-5" >
                <Form noValidate validated={validated} onSubmit={handleSubmit} >
                    <Form.Group controlId="formGroupUrl" className="h-50 d-flex justify-content-start align-items-baseline">
                        <Form.Label className="mr-2 w-25" >Link address</Form.Label>
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter url"
                                pattern="[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)"
                                onChange={props.urlLinkChangeHandler} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a url.
                             </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGroupUsername" className="h-50 d-flex justify-content-start align-items-baseline" >
                        <Form.Label className="mr-2 w-25" >Username</Form.Label>
                        <InputGroup>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Username"
                                onChange={props.usernameChangeHandler} />
                            <Form.Control.Feedback type="invalid">
                                Please choose a username.
                             </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword" className="h-50 d-flex justify-content-start align-items-baseline" >
                        <Form.Label className="mr-2 w-25" >Password</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend" onClick={handleShowPassword} >
                                    <i className={eyeLogo} style={{ fontSize: 24 }}></i>
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type={inputType}
                                placeholder="Password"
                                aria-describedby="inputGroupPrepend"
                                onChange={props.passwordChangeHandler}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a password.
                             </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="info" type="submit" name="submit" value="register" style={{ width: 100 }} >Save</Button>
                </Form>
            </div>
        </>
    )
}