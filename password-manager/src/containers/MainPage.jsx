import React from 'react'
import {
    Switch,
    Route,
    // Link,
    useHistory
} from 'react-router-dom'
// import { Provider } from 'react-redux'
import Button from 'react-bootstrap/Button';



export default function MainPage(props) {
    const history = useHistory()
    // console.log(history);

    return <>
        <Switch>
            <Route exact path="/">
                <div className="App-header">
                    <Button onClick={() => history.push('/hello')}>
                        Login Disini
                        </Button>
                </div>
            </Route>
            <Route path="/hello">
                <div className="App-header">
                    <Button onClick={() => history.push('/')}>
                        Password Disini
                        </Button>
                </div>
            </Route>
        </Switch>
    </>
}