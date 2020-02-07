import React from 'react'
import {
    Switch,
    Route,
    // Link,
    useHistory
} from 'react-router-dom'
// import { Provider } from 'react-redux'
import Button from 'react-bootstrap/Button';

import Auth from '../components/Auth';



export default function MainPage(props) {
    const history = useHistory()
    // console.log(history);

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
                    <Button onClick={() => history.push('/')}>
                        Password Maintenance Disini
                        </Button>
                </div>
            </Route>
        </Switch>
    </>
}