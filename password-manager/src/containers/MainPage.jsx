import React, { useEffect } from 'react'
import { firebase } from '../config/firebase'
import {
    Switch,
    Route,
    // Link,
    useHistory
} from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { Logout, Login } from '../store/actions/UserAction';

// import { Provider } from 'react-redux'
import Button from 'react-bootstrap/Button';

import Auth from '../components/Auth';



export default function MainPage(props) {
    const history = useHistory()
    const dispatch = useDispatch()
    // console.log(history);

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                dispatch(Login({
                    id: user.uid
                }))
                // User is signed in.
            } else {
                // No user is signed in.
                history.replace('/')
            }
        });
    }, [dispatch, history])

    return <>
        <Switch>
            <Route exact path="/">
                <div className="App-header">
                    <Auth>
                    </Auth>
                    {/* <Button onClick={() => history.push('/hello')}>
                        Login Disini
                        </Button> */}
                </div>
            </Route>
            {/* add private router here soon */}
            <Route path="/hello">
                <div className="">
                    <Button onClick={() => {
                        firebase.auth().signOut().then(function () {
                            history.push('/')
                            dispatch(Logout())
                            // Sign-out successful.
                        }).catch(function (error) {
                            // An error happened.
                            console.log(error);
                        });
                    }}>
                        Password Maintenance Disini
                        </Button>
                </div>
            </Route>
        </Switch>
    </>
}