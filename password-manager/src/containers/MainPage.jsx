import React, { useEffect } from 'react'
import { firebase } from '../config/firebase'
import {
    Switch,
    Route,
    // Link,
    useHistory
} from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { Login } from '../store/actions/UserAction';

// import { Provider } from 'react-redux'
import HomePage from './HomePage'
import Auth from '../components/Auth';
import PrivateRoute from '../config/PrivateRoute';



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
            <PrivateRoute path="/hello">
                <HomePage />
            </PrivateRoute>
        </Switch>
    </>
}