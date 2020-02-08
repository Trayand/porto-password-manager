import React, { useState } from 'react';
import NavBar from '../components/NavBar'
import FormPassword from '../components/FormPassword'

// import Button from 'react-bootstrap/Button';
// import { firebase } from '../config/firebase'
// import { useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { Logout } from '../store/actions/UserAction';

export default function HomePage(props) {

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [urlLink, setUrlLink] = useState('')

    const urlLinkChangeHandler = e => {
        setUrlLink(e.target.value)
    }
    const usernameChangeHandler = e => {
        setUsername(e.target.value)
    }

    const passwordChangeHandler = e => {
        setPassword(e.target.value)
    }

    return (
        <>
            <NavBar />
            <div className="d-flex w-100 flex-row">
                <div className="w-50" >
                    <h3 className="mt-5" >Save Your Password</h3>
                    <FormPassword
                        urlLink={urlLink} urlLinkChangeHandler={urlLinkChangeHandler}
                        username={username} usernameChangeHandler={usernameChangeHandler}
                        password={password} passwordChangeHandler={passwordChangeHandler}
                    />
                </div>
                <div className="w-50" >
                    <h3 className="my-5" >Test Your Password Might</h3>
                    <div className="d-flex flex-column align-items-start" >
                        <span> [ {
                            password.match(/.*[A-Z].*/)
                                ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                                : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                        } ]
                                Password setidaknya harus memiliki satu karakter huruf besar. ( upper-case ) </span>
                        <span> [ {
                            password.match(/.*[a-z].*/)
                                ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                                : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                        } ]
                                Password setidaknya harus memiliki satu karakter huruf kecil. ( lower-case ) </span>
                        <span> [ {
                            password.match(/.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E].*/)
                                ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                                : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                        } ]
                                Password setidaknya harus memiliki satu karakter huruf special. ( #$@!&%... ) </span>
                        <span> [ {
                            password.match(/.*\d.*/)
                                ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                                : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                        } ]
                                Password setidaknya harus memiliki satu angka.</span>
                        <span> [ {
                            password.length > 5
                                ? <span className="fa fa-check" style={{ color: 'green' }} ></span>
                                : <span className="fa fa-remove red" style={{ color: 'red' }} ></span>
                        } ]
                                Password setidaknya harus memiliki  panjang (length) lebih dari 5 karakter.</span>
                    </div>
                </div>
            </div>
        </>
    )

}