import React from 'react';

import Button from 'react-bootstrap/Button';
import { firebase } from '../config/firebase'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Logout } from '../store/actions/UserAction';

export default function NavBar(props) {
    const history = useHistory()
    const dispatch = useDispatch()


    return (
        <div
            className="d-flex justify-content-between w-100 px-5 py-2 bg-dark text-light"
            style={{ height: 60 }} >
            <h3>Passu-Wordo</h3>
            <div className="">
                <Button onClick={() => {
                    firebase.auth().signOut().then(function () {
                        history.push('/')
                        dispatch(Logout())
                        console.log('logout');
                        // Sign-out successful.
                    }).catch(function (error) {
                        // An error happened.
                        console.log(error);
                    });
                }} variant="outline-light">
                    Logout
                        </Button>
            </div>
        </div>
    )
}