import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar'
import FormPassword from '../components/FormPassword'
import HomePageList from '../components/HomePageList'

import ProgressBar from 'react-bootstrap/ProgressBar'

export default function HomePage(props) {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [urlLink, setUrlLink] = useState('')


    // buat progress bar
    const [strength1, setStrength1] = useState(0)
    const [strength2, setStrength2] = useState(0)
    const [strength3, setStrength3] = useState(0)
    const [strength4, setStrength4] = useState(0)
    const [strength5, setStrength5] = useState(0)
    const [totalStrength, setTotalStrength] = useState(0)

    useEffect(() => {
        let total;
        password.match(/.*[A-Z].*/) ? setStrength1(20) : setStrength1(0)
        password.match(/.*[a-z].*/) ? setStrength2(20) : setStrength2(0)
        password.match(/.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E].*/) ? setStrength3(20) : setStrength3(0)
        password.match(/.*\d.*/) ? setStrength4(20) : setStrength4(0)
        password.length > 5 ? setStrength5(20) : setStrength5(0)

        total = strength1 + strength2 + strength3 + strength4 + strength5
        setTotalStrength(total)

    }, [strength1, strength2, strength3, strength4, strength5, password])
    // buat progress bar


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
                        urlLink={urlLink} urlLinkChangeHandler={urlLinkChangeHandler} setUrlLink={setUrlLink}
                        username={username} usernameChangeHandler={usernameChangeHandler} setUsername={setUsername}
                        password={password} passwordChangeHandler={passwordChangeHandler} setPassword={setPassword}
                    />
                </div>
                <div className="w-50" >
                    <h3 className="my-5 pr-5" >Test Your Password Might</h3>
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
                    <br />
                    <div className="d-flex align-items-baseline" >
                        <ProgressBar animated className="w-75" now={totalStrength}
                            variant={totalStrength < 30 ? 'danger' : totalStrength < 50 ? 'warning' : totalStrength < 65 ? 'info' : 'success'} />
                        <p className="ml-3" style={totalStrength < 20 ? { color: 'white' } : totalStrength < 30 ? { color: 'red' } : totalStrength < 50 ? { color: 'orange' } : totalStrength < 65 ? { color: '#3489eb' } : { color: 'green' }} >
                            {totalStrength < 20 ? '' : totalStrength < 30 ? 'very weak' : totalStrength < 50 ? 'weak' : totalStrength < 65 ? 'medium' : totalStrength < 85 ? 'strong' : 'really strong'}
                        </p>
                    </div>
                </div>
            </div>
            <HomePageList className="w-100" />
        </>
    )

}