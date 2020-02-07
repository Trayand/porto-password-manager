import React from 'react';

import { Form, Button } from 'react-bootstrap';

export default function FormPassword(props) {





    return (
        <>
            <div className="w-75 mx-auto my-5" >
                <Form>
                    <Form.Group controlId="formGroupUrl" className="d-flex justify-content-start align-items-baseline">
                        <Form.Label className="mr-2 w-25" >Link address</Form.Label>
                        <Form.Control type="text" placeholder="Enter url" />
                    </Form.Group>
                    <Form.Group controlId="formGroupUsername" className="d-flex justify-content-start align-items-baseline" >
                        <Form.Label className="mr-2 w-25" >Username</Form.Label>
                        <Form.Control type="text" placeholder="Username" />
                    </Form.Group>
                    <Form.Group controlId="formGroupPassword" className="d-flex justify-content-start align-items-baseline" >
                        <Form.Label className="mr-2 w-25" >Password</Form.Label>
                        <Form.Control type="text" placeholder="Password" />
                    </Form.Group>
                    <Button variant="info" type="submit" name="submit" value="register" style={{ width: 100 }} >Save</Button>
                </Form>
            </div>
        </>
    )
}