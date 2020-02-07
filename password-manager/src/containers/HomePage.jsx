import React from 'react';
import NavBar from '../components/NavBar'
import FormPassword from '../components/FormPassword'

// import Button from 'react-bootstrap/Button';
// import { firebase } from '../config/firebase'
// import { useHistory } from 'react-router-dom'
// import { useDispatch } from 'react-redux'
// import { Logout } from '../store/actions/UserAction';

export default function HomePage(props) {

    // const history = useHistory()
    // const dispatch = useDispatch()


    return (
        <>
            <NavBar />
            {/* tombol logout */}
            {/* <div className="">
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
                }} variant="outline-secondary">
                    Logout
                        </Button>
            </div> */}
            {/* tombol logout */}
            <div className="d-flex w-100 flex-row">
                <div className="w-50" >
                    <h3 className="mt-5" >Save Your Password</h3>
                    <FormPassword />
                </div>
                <div className="w-50" >
                    <h1>Tes disini</h1>
                </div>
            </div>
        </>
    )

}