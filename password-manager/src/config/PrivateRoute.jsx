import React from 'react';
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function PrivateRoute(props) {
    const user = useSelector(state => state.user)

    return (
        <Route {...props}>
            {
                user
                    ? props.children
                    : <Redirect to="/" />
            }
        </Route>
    )
}